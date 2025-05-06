document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    })
  });

  const result = await response.json();
  if (result.success) {
    window.location.href = '/dashboard';
  } else {
    alert('Login failed - use admin/cyber2025');
  }
});