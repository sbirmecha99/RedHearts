document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        const isVisible = answer.style.display === 'block';
        
        document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');
        document.querySelectorAll('.faq-toggle').forEach(tog => tog.textContent = '+');
        
        answer.style.display = isVisible ? 'none' : 'block';
        toggle.textContent = isVisible ? '+' : '-';
    });
});