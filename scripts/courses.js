// course list array
const courses = [
    { code: 'CSE 110', title: 'Intro to Programming', type: 'CSE', credits: 2, completed: true },
    { code: 'WDD 130', title: 'Web Fundamentals', type: 'WDD', credits: 2, completed: true },
    { code: 'CSE 111', title: 'Programming with Functions', type: 'CSE', credits: 2, completed: true},
    { code: 'WDD 131', title: 'Dynamic Web Fundamentals', type: 'WDD', credits: 2, completed: true},
    { code: 'CSE 210', title: 'Programming with Classes', type: 'CSE', credits: 2, completed: false},
    { code: 'WDD 231', title: 'Web Frontend Development I', type: 'WDD', credits: 2, completed: false},
  ];
  
  // render function
  function renderCourses(filter = 'all') {
    const container = document.getElementById('course-cards');
    container.innerHTML = '';
    const filtered = courses.filter(c =>
      filter === 'all' ? true : c.type === filter
    );
  
    filtered.forEach(c => {
      const card = document.createElement('div');
      card.className = 'course-card' + (c.completed ? ' done' : '');
      card.innerHTML = `
        <h3>${c.code}</h3>
        <p>${c.title}</p>
        <p>${c.credits} credits</p>
      `;
      container.append(card);
    });
  
    // total credits
    const total = filtered.reduce((sum, c) => sum + c.credits, 0);
    document.getElementById('credit-total').textContent =
      `Total Credits: ${total}`;
  }
  
  // filter buttons
  document.querySelectorAll('.filter-controls button').forEach(btn => {
    btn.addEventListener('click', () => {
      document
        .querySelectorAll('.filter-controls button')
        .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCourses(btn.dataset.filter);
    });
  });
  
  // initial render
  renderCourses();
  