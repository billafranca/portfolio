const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Método não permitido' });
  }

  const { name, email, message } = request.body || {};
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    !name.trim() ||
    !emailPattern.test(email.trim()) ||
    !message.trim()
  ) {
    return response.status(400).json({ error: 'Dados inválidos' });
  }

  const apiResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': process.env.BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: { email: process.env.BREVO_SENDER_EMAIL, name: 'Portfólio Pedro Billafranca' },
      to: [{ email: process.env.BREVO_SENDER_EMAIL }],
      replyTo: { email: email.trim(), name: name.trim() },
      subject: `Contato do portfólio: ${name.trim().slice(0, 80)}`,
      textContent: `Nome: ${name.trim()}\nE-mail: ${email.trim()}\n\n${message.trim()}`,
    }),
  });

  if (!apiResponse.ok) {
    return response.status(502).json({ error: 'Serviço de e-mail indisponível' });
  }

  return response.status(200).json({ ok: true });
}
