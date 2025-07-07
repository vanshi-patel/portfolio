// Navigation handling
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.header');
let lastScroll = 0;

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Hide header on scroll down, show on scroll up
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.style.transform = 'translateY(-100%)';
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.style.transform = 'translateY(0)';
        header.classList.remove('scroll-down');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
            hamburger.classList.remove('active');
        }
    });
});

// Active section highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Skills animation
const skillBars = document.querySelectorAll('.progress');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

// Intersection Observer for skill bars animation
const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillsObserver.observe(skillsSection);

// Project cards data
const projects = [
    {
        title: 'Nail Art Appointment System',
        description: 'An advanced web application for nail art services featuring a sophisticated appointment booking system. Built with ASP.NET framework, demonstrating improved features and enhanced security compared to previous projects.',
        highlights: [
            'Secure user authentication and session management using ASP.NET',
            'Dynamic admin dashboard with real-time updates',
            'Advanced appointment scheduling system',
            'Interactive nail art design gallery with JavaScript',
            'Improved database structure and relationships',
            'Enhanced user experience with modern UI using Bootstrap'
        ],
        technologies: ['ASP.NET', 'C#', 'SQL Server', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
        image: './project-imgs/project-2.PNG',
        githubLink: 'https://github.com/vanshi-patel/NailTrendZ_Project'
    },
    {
        title: 'Mehendi Booking Platform',
        description: 'A PHP-based web platform for browsing mehendi designs and booking appointments. Implemented core features for both customers and administrators using PHP and MySQL.',
        highlights: [
            'User-friendly design gallery with PHP backend',
            'Basic appointment booking system',
            'Admin panel for management',
            'Customer feedback system',
            'MySQL database integration',
            'Responsive design using HTML, CSS, and JavaScript'
        ],
        technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
        image: './project-imgs/project-1.PNG',
        githubLink: 'https://github.com/vanshi-patel/Mahendi_Project'
    }
];

// Generate project cards
const projectsGrid = document.querySelector('.projects-grid');

projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    
    projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-highlights">
                <h4>Key Features:</h4>
                <ul>
                    ${project.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
            </div>
            <div class="setup-instructions">
                <h4>Setup Instructions:</h4>
                <p>${project.title === 'Mehendi Booking Platform' ? 
                    'This is a PHP project that requires a web server with PHP support and MySQL database. To run locally:' :
                    'This is an ASP.NET project that requires Windows with IIS/Visual Studio and SQL Server. To run locally:'}</p>
                <ol>
                    <li>Clone the repository</li>
                    <li>${project.title === 'Mehendi Booking Platform' ? 
                        'Set up a local PHP server (e.g., XAMPP, WAMP)' :
                        'Open the solution in Visual Studio'}</li>
                    <li>${project.title === 'Mehendi Booking Platform' ? 
                        'Import the provided MySQL database' :
                        'Restore the SQL Server database from backup'}</li>
                    <li>${project.title === 'Mehendi Booking Platform' ? 
                        'Configure database connection in config file' :
                        'Update the connection string in Web.config'}</li>
                    <li>${project.title === 'Mehendi Booking Platform' ? 
                        'Place the files in your web server directory' :
                        'Build and run the project'}</li>
                </ol>
            </div>
            <div class="project-tags">
                ${project.technologies.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.githubLink}" class="project-link github-link" target="_blank">
                    <i class="fab fa-github"></i> Source Code
                </a>
            </div>
        </div>
    `;
    
    projectsGrid.appendChild(projectCard);
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
const submitButton = contactForm.querySelector('.submit-btn');
const buttonText = submitButton.querySelector('.btn-text');
const loadingSpinner = submitButton.querySelector('.loading-spinner');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    submitButton.disabled = true;
    buttonText.style.opacity = '0';
    loadingSpinner.style.display = 'block';
    
    try {
        // Get form data
        const formData = new FormData(contactForm);
        const templateParams = {
            to_name: 'Vanshi',
            to_email: 'vanshipatel3114@gmail.com',
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            message: formData.get('message')
        };

        console.log('Sending email with params:', templateParams);

        // Send email using EmailJS
        const result = await emailjs.send(
            'YOUR_SERVICE_ID',  // ← Replace this after getting your service ID
            'YOUR_TEMPLATE_ID', // ← Replace this after getting your template ID
            templateParams
        );

        console.log('EmailJS Response:', result);

        if (result.status === 200) {
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            throw new Error(`Failed to send message. Status: ${result.status}`);
        }
    } catch (error) {
        console.error('Error sending email:', error);
        alert('Sorry, there was an error sending your message. Please try again later.');
    } finally {
        // Reset button state
        submitButton.disabled = false;
        buttonText.style.opacity = '1';
        loadingSpinner.style.display = 'none';
    }
});

// Add CSS for project cards
const style = document.createElement('style');
style.textContent = `
    .project-card {
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
    }
    
    .project-card:hover {
        transform: translateY(-5px);
    }
    
    .project-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
    
    .project-content {
        padding: 1.5rem;
    }
    
    .project-content h3 {
        margin-bottom: 0.5rem;
        color: var(--text-color);
    }
    
    .project-content p {
        color: var(--light-text);
        margin-bottom: 1rem;
    }
    
    .project-highlights {
        margin-bottom: 1rem;
    }
    
    .project-highlights h4 {
        margin-bottom: 0.5rem;
        color: var(--text-color);
    }
    
    .project-highlights ul {
        list-style-type: disc;
        padding-left: 20px;
    }
    
    .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .tag {
        background-color: var(--section-bg);
        color: var(--primary-color);
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.875rem;
    }
    
    .project-links {
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
    }

    .project-link {
        flex: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 500;
        transition: all 0.3s ease;
        padding: 0.8rem 1.2rem;
        border: 2px solid var(--primary-color);
        border-radius: 25px;
        text-align: center;
    }

    .project-link i {
        font-size: 1.2rem;
    }

    .project-link:hover {
        background-color: var(--primary-color);
        color: white;
        transform: translateY(-2px);
    }

    .github-link {
        background-color: #24292e;
        border-color: #24292e;
        color: white;
    }

    .github-link:hover {
        background-color: #2c3238;
        border-color: #2c3238;
    }

    @media (prefers-color-scheme: dark) {
        .project-card {
            background: #2d2d2d;
        }
        
        .tag {
            background-color: #1a1a1a;
        }

        .github-link {
            background-color: #2c3238;
            border-color: #2c3238;
        }

        .github-link:hover {
            background-color: #363b42;
            border-color: #363b42;
        }
    }

    .setup-instructions {
        background-color: rgba(37, 99, 235, 0.05);
        padding: 1.2rem;
        border-radius: 8px;
        margin: 1.5rem 0;
    }

    .setup-instructions h4 {
        color: var(--primary-color);
        margin-bottom: 0.8rem;
        font-weight: 600;
    }

    .setup-instructions p {
        margin-bottom: 1rem;
        font-size: 0.95rem;
    }

    .setup-instructions ol {
        padding-left: 1.2rem;
    }

    .setup-instructions li {
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
        color: var(--text-color);
    }

    @media (prefers-color-scheme: dark) {
        .setup-instructions {
            background-color: rgba(255, 255, 255, 0.05);
        }

        .setup-instructions li {
            color: #e5e7eb;
        }
    }

    .submit-btn {
        position: relative;
        width: 100%;
        padding: 1rem;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .submit-btn:hover {
        background-color: var(--secondary-color);
    }

    .submit-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .loading-spinner {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
`;

document.head.appendChild(style); 
