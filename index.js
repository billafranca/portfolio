(function(){
  // Cursor
  var dot=document.getElementById('cdot'),ring=document.getElementById('cring');
  var mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
  (function ar(){rx+=(mx-rx)*.11;ry+=(my-ry)*.11;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(ar);})();
  document.querySelectorAll('a,button,input,textarea').forEach(function(el){
    el.addEventListener('mouseenter',function(){ring.style.width='54px';ring.style.height='54px';ring.style.opacity='.22';});
    el.addEventListener('mouseleave',function(){ring.style.width='36px';ring.style.height='36px';ring.style.opacity='.4';});
  });

  // Theme
  var dark=true;
  document.getElementById('themeBtn').addEventListener('click',function(){
    dark=!dark;
    document.documentElement.setAttribute('data-theme',dark?'dark':'light');
    document.getElementById('themeIcon').innerHTML=dark?'&#9728;':'&#9790;';
    document.getElementById('themeLabel').textContent=dark?'Light':'Dark';
    this.classList.toggle('on',!dark);
  });

  // Language
  var en=false;
  document.getElementById('langBtn').addEventListener('click',function(){
    en=!en;
    document.documentElement.setAttribute('data-lang',en?'en':'pt');
    document.documentElement.setAttribute('lang',en?'en':'pt-BR');
    document.getElementById('langLabel').textContent=en?'PT':'EN';
    this.classList.toggle('on',en);
  });

  // Fade in
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e,i){if(e.isIntersecting)setTimeout(function(){e.target.classList.add('v');},i*70);});
  },{threshold:.08});
  document.querySelectorAll('.fi').forEach(function(el){obs.observe(el);});

  // Contact form
  document.querySelector('.bsend').addEventListener('click',async function(event){
    event.preventDefault();
    var button=event.currentTarget;
    var fields=document.querySelectorAll('.cform input, .cform textarea');
    var name=fields[0].value.trim();
    var email=fields[1].value.trim();
    var message=fields[2].value.trim();
    var originalLabel=button.innerHTML;

    if(!name || !email || !message){
      button.innerHTML='<span>Preencha todos os campos</span>';
      setTimeout(function(){button.innerHTML=originalLabel;},2500);
      return;
    }

    button.disabled=true;
    button.innerHTML='<span>Enviando...</span>';
    try{
      var response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:name,email:email,message:message})});
      if(!response.ok) throw new Error('Falha ao enviar');
      button.innerHTML='<span>Mensagem enviada</span>';
      fields.forEach(function(field){field.value='';});
    }catch(error){
      button.innerHTML='<span>Não foi possível enviar</span>';
    }finally{
      setTimeout(function(){button.disabled=false;button.innerHTML=originalLabel;},3000);
    }
  });
})();
