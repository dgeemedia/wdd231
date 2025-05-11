document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
    menuToggle.textContent = nav.classList.contains('show') ? '❌' : '☰';
  });

  document.getElementById('current-year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent =
    'Last Update: ' + document.lastModified;
  
    // Courses & filtering
    const courses = [
      { code:'CSE 110', title:'Intro to Programming', type:'CSE', credits:2, completed:true },
      { code:'WDD 130', title:'Web Fundamentals', type:'WDD', credits:2, completed:true },
      { code:'CSE 111', title:'Programming with Functions', type:'CSE', credits:2, completed:true },
      { code:'WDD 131', title:'Dynamic Web Fundamentals', type:'WDD', credits:2, completed:true },
      { code:'CSE 210', title:'Programming with Classes', type:'CSE', credits:2, completed:false },
      { code:'WDD 231', title:'Web Frontend Development I', type:'WDD', credits:2, completed:false }
    ];
  
    function renderCourses(filter='all') {
      const container = document.getElementById('course-cards');
      container.innerHTML = '';
      const list = courses.filter(c => filter==='all' ? true : c.type===filter);
      list.forEach(c => {
        const div = document.createElement('div');
        div.className = 'course-card' + (c.completed ? ' done' : '');
        div.innerHTML = `<h3>${c.code}</h3><p>${c.title}</p><p>${c.credits} credits</p>`;
        container.append(div);
      });
      const total = list.reduce((sum,c)=>sum+c.credits,0);
      document.getElementById('credit-total').textContent = `Total Credits: ${total}`;
    }
  
    document.querySelectorAll('.filter-controls button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-controls button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCourses(btn.dataset.filter);
      });
    });
  
    renderCourses('all');
  });
  