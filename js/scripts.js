const secciones = [...document.querySelectorAll('section')];
const puntos = [...document.querySelectorAll('nav a')];

// Aparición al deslizar + punto activo del menú
const obs = new IntersectionObserver((es) => {
  es.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      puntos.forEach((p) => p.classList.toggle('activo', p.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { threshold: 0.5 });
secciones.forEach((s) => obs.observe(s));

// Barra de progreso
addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  document.getElementById('progreso').style.width = (scrollY / max * 100) + '%';
}, { passive: true });

// Inicio: halo que sigue al cursor y tarjeta que se inclina
const inicio = document.getElementById('inicio');
const halo = document.getElementById('halo');
inicio.addEventListener('pointermove', (e) => {
  const r = inicio.getBoundingClientRect();
  halo.style.transform = `translate(${e.clientX - r.left - 190}px, ${e.clientY - r.top - 190}px)`;
});
const tarjeta = document.getElementById('tarjeta');
tarjeta.addEventListener('pointermove', (e) => {
  const r = tarjeta.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
  tarjeta.style.transform = `rotateY(${x * 28}deg) rotateX(${-y * 28}deg)`;
});
tarjeta.addEventListener('pointerleave', () => tarjeta.style.transform = '');

// Equipo: seleccionar persona
const detalle = document.getElementById('detalle');
document.querySelectorAll('.persona').forEach((b) => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.persona').forEach((o) => o.setAttribute('aria-pressed', o === b));
    detalle.innerHTML = '';
    const t = document.createElement('strong'); t.textContent = b.dataset.nombre;
    detalle.append(t, b.dataset.rol);
  });
});

// Formulario: contador, validación y mensaje de éxito
const com = document.getElementById('comentario'), correo = document.getElementById('correo');
com.addEventListener('input', () => document.getElementById('cuenta').textContent = com.value.length);
document.getElementById('form').addEventListener('submit', (ev) => {
  ev.preventDefault();
  const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value);
  correo.classList.toggle('error', !valido);
  document.getElementById('err-correo').textContent = valido ? '' : 'Escribe un correo válido, por ejemplo nombre@dominio.com.';
  if (!valido) return correo.focus();
  if (!com.value.trim()) return com.focus();
  document.getElementById('formulario').classList.add('listo');
});

// Nieve en la portada
(() => {
  const cont = document.getElementById('nieve');
  for (let i = 0; i < 40; i++) {
    const f = document.createElement('i'), t = 3 + Math.random() * 6;
    f.style.cssText = `left:${Math.random() * 100}%;width:${t}px;height:${t}px;animation-duration:${6 + Math.random() * 8}s;animation-delay:-${Math.random() * 10}s`;
    cont.appendChild(f);
  }
})();