// Add smooth scroll behavior
document.addEventListener('DOMContentLoaded', function() {
  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe grid cards
  document.querySelectorAll('.grid.cards li').forEach(card => {
    observer.observe(card);
  });

  // Add hover effect to buttons
  document.querySelectorAll('.md-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Add copy feedback for code blocks
  document.querySelectorAll('.md-clipboard').forEach(button => {
    button.addEventListener('click', function() {
      const feedback = document.createElement('span');
      feedback.textContent = '已复制!';
      feedback.style.cssText = 'position: absolute; top: -30px; right: 0; background: #10b981; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; animation: fadeIn 0.3s ease;';
      this.style.position = 'relative';
      this.appendChild(feedback);
      
      setTimeout(() => {
        feedback.remove();
      }, 2000);
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});

// Add particle effect to hero section (optional)
function createParticles() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
      animation-delay: ${Math.random() * 2}s;
    `;
    hero.style.position = 'relative';
    hero.style.overflow = 'hidden';
    hero.appendChild(particle);
  }
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) translateX(${Math.random() * 50 - 25}px);
    }
  }
`;
document.head.appendChild(style);

// Initialize particles after a short delay
setTimeout(createParticles, 500);
