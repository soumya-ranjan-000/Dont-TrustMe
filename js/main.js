document.addEventListener('DOMContentLoaded',()=>{
  const checkBtn=document.getElementById('checkBtn');
  checkBtn.addEventListener('click',handleSearch);

  // attach ripple handlers on buttons
  document.querySelectorAll('.btn').forEach(btn=>{
    btn.addEventListener('click',createRipple);
  });

  // reveal-on-scroll using IntersectionObserver
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.12});
  document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));
});

function handleSearch(e){
  const inDate=document.getElementById('checkin').value;
  const outDate=document.getElementById('checkout').value;
  const guests=document.getElementById('guests').value;
  if(!inDate || !outDate){
    alert('Please choose check-in and check-out dates.');
    return;
  }
  const query = { checkin: inDate, checkout: outDate, guests: Number(guests) };
  sessionStorage.setItem('searchQuery', JSON.stringify(query));
  // small interaction before navigating
  document.getElementById('checkBtn').classList.add('loading');
  setTimeout(()=> window.location.href = 'results.html', 250);
}

// create a simple ripple element for buttons
function createRipple(e){
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const circle = document.createElement('span');
  const size = Math.max(rect.width, rect.height) * 1.2;
  circle.style.width = circle.style.height = size + 'px';
  circle.style.left = (e.clientX - rect.left - size/2) + 'px';
  circle.style.top = (e.clientY - rect.top - size/2) + 'px';
  circle.className = 'ripple';
  btn.appendChild(circle);
  requestAnimationFrame(()=>{
    circle.style.transform = 'scale(1)';
    circle.style.opacity = '0';
  });
  setTimeout(()=>{ try{ btn.removeChild(circle); }catch(_){} }, 600);
}

// helper to format price (used on results page if needed)
function formatPrice(n){ return '$' + n.toFixed(2); }
