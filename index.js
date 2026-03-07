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
})();