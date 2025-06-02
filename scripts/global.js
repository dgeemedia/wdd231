document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
    menuToggle.textContent = nav.classList.contains('show') ? '❌' : '☰';
  });

  document.getElementById('current-year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = 'Last Update: ' + document.lastModified;

  const courses = [
    {
      code: 'CSE 110',
      title: 'Intro to Programming',
      type: 'CSE',
      credits: 2,
      completed: true,
      description: 'Introduction to logic and programming concepts.',
      certificate: 'Web & Computer Programming',
      technology: ['Python']
    },
    {
      code: 'WDD 130',
      title: 'Web Fundamentals',
      type: 'WDD',
      credits: 2,
      completed: true,
      description: 'Basics of web design, HTML and CSS.',
      certificate: 'Web & Computer Programming',
      technology: ['HTML', 'CSS']
    },
    {
      code: 'CSE 111',
      title: 'Programming with Functions',
      type: 'CSE',
      credits: 2,
      completed: true,
      description: 'Structured programming with Python.',
      certificate: 'Web & Computer Programming',
      technology: ['Python']
    },
    {
      code: 'WDD 131',
      title: 'Dynamic Web Fundamentals',
      type: 'WDD',
      credits: 2,
      completed: true,
      description: 'Learn JavaScript and DOM manipulation.',
      certificate: 'Web & Computer Programming',
      technology: ['HTML', 'CSS', 'JavaScript']
    },
    {
      code: 'CSE 210',
      title: 'Programming with Classes',
      type: 'CSE',
      credits: 2,
      completed: false,
      description: 'Object-oriented programming in Python.',
      certificate: 'Web & Computer Programming',
      technology: ['Python']
    },
    {
      code: 'WDD 231',
      title: 'Web Frontend Development I',
      type: 'WDD',
      credits: 2,
      completed: false,
      description: 'Frontend development using advanced HTML, CSS, JS.',
      certificate: 'Web & Computer Programming',
      technology: ['HTML', 'CSS', 'JavaScript']
    }
  ];

  function renderCourses(filter = 'all') {
    const container = document.getElementById('course-cards');
    container.innerHTML = '';

    const list = courses.filter(c => filter === 'all' ? true : c.type === filter);

    list.forEach(c => {
      const div = document.createElement('div');
      div.className = 'course-card' + (c.completed ? ' done' : '');
      div.innerHTML = `
        <h3>${c.code}</h3>
        <p>${c.title}</p>
        <p>${c.credits} credits</p>
      `;
      div.addEventListener('click', () => {
        displayCourseDetails(c);
      });
      container.appendChild(div);
    });

    const total = list.reduce((sum, c) => sum + c.credits, 0);
    document.getElementById('credit-total').textContent = `Total Credits: ${total}`;
  }

  function displayCourseDetails(course) {
    const courseDetails = document.getElementById('course-details');
    courseDetails.innerHTML = `
      <button id="closeModal">❌</button>
      <h2>${course.code}</h2>
      <h3>${course.title}</h3>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Certificate:</strong> ${course.certificate}</p>
      <p><strong>Description:</strong> ${course.description}</p>
      <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
    `;
    courseDetails.showModal();

    document.getElementById('closeModal').addEventListener('click', () => {
      courseDetails.close();
    });

    courseDetails.addEventListener('click', (e) => {
      if (e.target === courseDetails) {
        courseDetails.close();
      }
    });
  }

  document.querySelectorAll('.filter-controls button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-controls button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCourses(btn.dataset.filter);
    });
  });

  renderCourses('all');
}); // end function
