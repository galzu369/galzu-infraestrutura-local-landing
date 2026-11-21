(() => {
  'use strict';
  const track = (event, data = {}) => { try { window.umami?.track(event, data); } catch {} };
  if (['galzu.pro', 'www.galzu.pro'].includes(location.hostname)) {
    const script = document.createElement('script');
    script.defer = true; script.src = 'https://cloud.umami.is/script.js';
    script.dataset.websiteId = '4956f3eb-0750-4e2a-9772-d872b0e5483f';
    script.dataset.domains = 'galzu.pro,www.galzu.pro'; script.dataset.doNotTrack = 'true';
    document.head.appendChild(script);
  }
  document.querySelectorAll('[data-cta]').forEach(link => link.addEventListener('click', () => track('formacao_cta', { posicao: link.dataset.cta, curso: 'iniciante' })));
  const form = document.getElementById('training-form');
  const status = document.getElementById('form-status');
  const button = form.querySelector('button[type=submit]');
  let sending = false;
  form.addEventListener('focusin', () => track('formacao_inicio', { curso: 'iniciante' }), { once: true });
  form.addEventListener('invalid', () => track('formacao_validacao'), true);
  const campaign = {};
  const query = new URLSearchParams(location.search);
  let previous = {};
  try { previous = JSON.parse(sessionStorage.getItem('galzu-origem') || '{}') || {}; } catch {}
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    const value = query.get(key) || previous[key];
    if (typeof value === 'string' && value) campaign[key] = value.slice(0, 150);
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.reportValidity() || form.elements.botcheck.checked) return;
    sending = true; button.disabled = true; button.textContent = 'A enviar…'; status.textContent = 'A enviar a tua pré-inscrição…';
    const data = Object.fromEntries(new FormData(form));
    Object.assign(data, campaign, { origem: 'galzu.pro/formacao.html', replyto: data.email });
    const abort = new AbortController();
    const timer = setTimeout(() => abort.abort(), 15000);
    try {
      const response = await fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data), signal: abort.signal });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('submission_failed');
      form.reset();
      status.textContent = 'Pré-inscrição recebida. A tua preferência de horário ficou registada. Entraremos em contacto para confirmar a turma, o horário e as condições da edição. Ainda não tens uma vaga confirmada e não há pagamento nesta fase.';
      track('formacao_enviada', { curso: 'iniciante' });
    } catch {
      status.textContent = 'Não conseguimos confirmar o envio. Os teus dados continuam no formulário. Tenta novamente ou escreve para galzuconsult@gmail.com. Se houve uma falha de ligação, o pedido pode já ter chegado.';
      track('formacao_falha', { curso: 'iniciante' });
    } finally {
      clearTimeout(timer); sending = false; button.disabled = false; button.textContent = 'Enviar pré-inscrição ↗'; status.focus();
    }
  });
})();
