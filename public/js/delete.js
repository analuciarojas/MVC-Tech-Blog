// Delete a post form handler 
async function deleteFormHandler(event) {
    event.preventDefault();
    // Get ID
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
        ];
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
      });
    if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
  }
  
  document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);