let behaviorData = {
    mouseMovements: [],
    typingPattern: []
  };
  
  // Track mouse movements
  document.addEventListener('mousemove', (e) => {
    behaviorData.mouseMovements.push({
      x: e.clientX,
      y: e.clientY,
      t: Date.now()
    });
  });
  
  // Track typing
  document.querySelector('input').addEventListener('keydown', (e) => {
    behaviorData.typingPattern.push({
      key: e.key,
      time: Date.now()
    });
  });
  
  // Send with login form
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        behaviorData: behaviorData
      })
    }).then(res => res.json())
      .then(data => {
        if (data.success) window.location.href = '/dashboard.html';
      });
  });