// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .stat, .about-placeholder');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        padding: 15px 20px;
        border-radius: 10px;
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
        font-family: 'Inter', sans-serif;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 15px;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: inherit;
                opacity: 0.7;
                transition: opacity 0.3s ease;
            }
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // Add a small delay before starting the animation
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Skills animation on scroll
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth reveal animation for sections
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.15 });

revealSections.forEach(section => {
    revealObserver.observe(section);
});

// Add CSS for reveal animation
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        section.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        .hero {
            opacity: 1 !important;
            transform: none !important;
        }
    `;
    document.head.appendChild(style);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
document.addEventListener('DOMContentLoaded', () => {
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadingStyle);
});

// Experience modal data
const experienceData = {
    projects: {
        title: "Projects",
        items: [
            {
                name: "Face Recognition Attendance System",
                description: "Developed a comprehensive Raspberry Pi-based proof-of-concept for automated attendance tracking using advanced facial recognition technology. Implemented real-time face detection and recognition algorithms with high accuracy rates.",
                technologies: ["Raspberry Pi", "Python", "OpenCV", "Face Recognition", "Computer Vision"]
            },
            {
                name: "Python-Based Hardware Testing Application",
                description: "Created a comprehensive testing suite for hardware validation and prototype development with automated reporting capabilities. Streamlined the testing process and improved efficiency by 40%.",
                technologies: ["Python", "Tkinter", "Hardware Testing", "Automation", "GUI Development"]
            },
            {
                name: "IR Camera Virtual Graffiti System",
                description: "Developed an innovative proof-of-concept using infrared camera technology for virtual drawing and interactive presentation applications. Created immersive user experiences for educational and entertainment purposes.",
                technologies: ["IR Camera", "Computer Vision", "Python", "Interactive Systems", "Real-time Processing"]
            },
            {
                name: "Nextion Display GUI Application",
                description: "Designed and developed custom user interface applications for industrial display systems with advanced touch interaction capabilities. Enhanced user experience and system usability.",
                technologies: ["Nextion Display", "GUI Design", "Embedded Systems", "Touch Interface", "Industrial Applications"]
            }
        ]
    },
    content: {
        title: "Content Creator & Speaker",
        hasCustomLayout: true,
        sections: {
            speaker: {
                title: "Speaker Events",
                items: [
                    {
                        name: "Student Development Program - Engineering Colleges",
                        description: "Delivered comprehensive development programs focusing on emerging technologies and practical skill building. Conducted workshops and seminars across multiple engineering institutions, improving student engagement and technical competency.",
                        technologies: ["Public Speaking", "Technology Training", "Skill Building", "Mentoring", "Program Design"],
                        image: "images/Speaker/Hubbli_engineering_clg_IOT.png",
                        audience: "Engineering Students",
                        reach: "200+ Students"
                    },
                    {
                        name: "Deep Learning Workshop - Engineering Colleges  ",
                        description: "Conducted hands-on IoT workshops for engineering students, covering sensor integration, data collection, and real-world applications. Led interactive sessions with practical demonstrations and project-based learning.",
                        technologies: ["IoT", "Sensors", "Workshop Facilitation", "Arduino", "Hands-on Training"],
                        image: "images/Speaker/bng_ftp_mani_speak.jpeg",
                        audience: "Technical Students",
                        reach: "150+ Participants"
                    }
                ]
            },
            contentCreator: {
                title: "Content Creator",
                items: [
                    {
                        name: "AI & Deep Learning Training Content",
                        description: "Developed comprehensive training materials covering AI fundamentals, deep learning concepts, and practical implementation strategies. Created engaging content with real-world examples and hands-on exercises.",
                        technologies: ["AI/ML", "Deep Learning", "Training Materials", "Educational Content", "Technical Writing"]
                    },
                    {
                        name: "IoT Workshop Content Development",
                        description: "Created hands-on IoT workshop materials covering sensor integration, data collection, and real-world applications. Developed curriculum for 100+ students across multiple colleges.",
                        technologies: ["IoT", "Sensors", "Curriculum Design", "Arduino", "Educational Content"]
                    },
                    {
                        name: " Python Training Content",
                        description: "Created educational content, tutorials, and documentation for various technical topics and emerging technologies. Published content reached 1000+ learners.",
                        technologies: ["Content Creation", "Documentation", "Technical Writing", "Tutorial Development", "Knowledge Sharing"]
                    }
                ]
            }
            
        }
    },
    moko: {
        title: "Moko - Product Support",
        items: [
            {
                name: "Product Support",
                description: "Company Role: Provided tech support and prototype development for an Electronic product. My Contribution: Developed Python-based prototype applications to demonstrate product functionality and real-world use case",
                technologies: ["Spectrum Analysis", "JFET Characteristics Measurement", "Wide Band Analyzer"]
            },
            
        ]
    },
    expo: {
        title: "Expo - Experience",
        items: [
            {
                name: "SmartBharat Expo 2024",
                description: "Represented Client Product at SmartBharat Expo 2024, demonstrating innovative products and engaging with industry professionals and potential clients. Generated significant business leads and partnerships.",
                technologies: [],
                image: "images/expo/smartbharat-2024.jpeg",
                linkedinPost: {
                    url: "https://www.linkedin.com/posts/manirajan-k_smartbharat-indiaelectronicsweek-iew-activity-7160255182298058752-CQ-B?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD4f9DgBC2pATSwQGsMaKS8IQhTAPBf7mvY",
                    text: "View LinkedIn Post"
                }
            },
            {
                name: "Electronica India & Productronica India 2023",
                description: "Participated in major electronics and production technology exhibitions, showcasing innovative solutions and building industry connections. Represented company at international level.",
                technologies: [],
                image: "images/expo/electronica-india-2023_2.jpeg",
                linkedinPost: {
                    url: "https://www.linkedin.com/posts/manirajan-k_electronicaindia2023-lasercuttingmachine-activity-7108036713612013568-Kbia?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD4f9DgBC2pATSwQGsMaKS8IQhTAPBf7mvY",
                    text: "View LinkedIn Post"
                }
            },
            {
                name: "IISc Bangalore Roadshow 2023",
                description: "Represented company at prestigious IISc Bangalore roadshow, presenting innovations to academic community and research professionals. Built valuable academic-industry connections.",
                technologies: [],
                image: "images/expo/iisc-roadshow-2023.jpeg",
                linkedinPost: {
                    url: "https://www.linkedin.com/posts/mew-technology_mew-technology-global-roadshow-2023-iisc-ugcPost-7108752322196885504-_ENc?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD4f9DgBC2pATSwQGsMaKS8IQhTAPBf7mvY",
                    text: "View LinkedIn Post"
                }
            }
        ]
    },
    hardware: {
        title: "Hardware - Handson",
        items: [
            {
                name: "Microcontroller | Microprocessor | FPGA ",
                description: "Hands-on experience with Arduino and ESP32 microcontrollers, Raspberry Pi microprocessor, and Moko FPGA platforms. Skilled in developing and integrating hardware systems across embedded and programmable logic devices.",
                technologies: ["Arduino", "ESP32", "Raspberry Pi", "Moko"]
            },
            {
                name: "Communication Protocols Implementation",
                description: "Practical experience with UART, SPI, I2C, and Bluetooth communication protocols for prototype development and research. Implemented cloud connectivity for data transmission and remote control of small motors via third-party applications..",
                technologies: ["UART", "Bluetooth", "I²C", "SPI", "Third party Cloud","socket"]
            },
            {
                name: "Applications",
                description: "Hands-on experience in hardware-based applications, including a Raspberry Pi-based attendance system and Moko FPGA real-time prototype development. Integrated basic sensors with cloud connectivity, developed user interfaces using Nextion displays, and built a socket-based text messaging application for real-time device communication.",
                technologies: ["Attendance system", "Socket Programming", "Moko - prototype", "Nextion displays"]
            }
        ]
    },
    rnd: {
        title: "R&D - Project",
        items: [
            {
                name: "Satellite-Based Image Registration",
                description: "Assisted in advanced research project focusing on satellite-based image registration techniques for geospatial applications. Contributed to cutting-edge research in remote sensing technology.",
                technologies: ["Satellite Imagery", "Image Registration", "Geospatial Analysis", "Remote Sensing", "Research"]
            },
            {
                name: "Student Research Project Assistance",
                description: "Provided comprehensive guidance and technical support to student research projects, mentoring on methodology and implementation. Helped students achieve their research objectives successfully.",
                technologies: ["Research Mentoring", "Student Guidance", "Technical Support", "Methodology", "Project Management"]
            },
            {
                name: "Industrial-Grade Sensor Applications",
                description: "Worked with basic and industrial-grade sensors for real-world applications, focusing on reliability and standards compliance. Ensured robust performance in challenging environments.",
                technologies: ["Industrial Sensors", "Real-world Applications", "Standards Compliance", "Reliability Testing", "Quality Assurance"]
            }
        ]
    }
};

// Function to open modal with detailed content
window.toggleDetails = function(category) {
    console.log('Opening modal for category:', category);
    
    const modal = document.getElementById('experienceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    const data = experienceData[category];
    if (!data) {
        console.error('No data found for category:', category);
        return;
    }
    
    // Set modal title
    modalTitle.textContent = data.title;
    
    // Generate modal content
    let content = '';
    
    // Check if this section has custom layout (Content Creator & Speaker)
    if (data.hasCustomLayout && data.sections) {
        // Handle Content Creator & Speaker custom layout with horizontal container
        content += '<div class="content-speaker-container">';
        
        Object.keys(data.sections).forEach(sectionKey => {
            const section = data.sections[sectionKey];
            content += `
                <div class="custom-section">
                    <h2 class="section-subtitle">${section.title}</h2>
                    <div class="section-grid ${sectionKey === 'speaker' ? 'speaker-grid' : ''}">
            `;
            
            section.items.forEach((item, index) => {
                content += `
                    <div class="modal-item ${sectionKey === 'speaker' ? 'speaker-item' : ''}">
                        <h3>${index + 1}. ${item.name}</h3>
                        ${item.image ? `
                            <div class="expo-image-container">
                                <img src="${item.image}" alt="${item.name}" class="expo-image" loading="lazy">
                            </div>
                        ` : ''}
                        <p>${item.description}</p>
                        ${item.audience ? `<p class="speaker-info"><strong>Audience:</strong> ${item.audience}</p>` : ''}
                        ${item.reach ? `<p class="speaker-info"><strong>Reach:</strong> ${item.reach}</p>` : ''}
                        <div class="modal-tech-tags">
                            ${item.technologies.map(tech => `<span>${tech}</span>`).join('')}
                        </div>
                        ${item.linkedinPost ? `
                            <div class="linkedin-post-container">
                                <a href="${item.linkedinPost.url}" target="_blank" class="linkedin-post-link">
                                    <i class="fab fa-linkedin"></i> ${item.linkedinPost.text}
                                </a>
                            </div>
                        ` : ''}
                    </div>
                `;
            });
            
            content += `
                    </div>
                </div>
            `;
        });
        
        content += '</div>';
    } else {
        // Handle regular layout for other sections
        data.items.forEach((item, index) => {
            content += `
                <div class="modal-item">
                    <h3>${index + 1}. ${item.name}</h3>
                    ${item.image ? `
                        <div class="expo-image-container">
                            <img src="${item.image}" alt="${item.name}" class="expo-image" loading="lazy">
                        </div>
                    ` : ''}
                    <p>${item.description}</p>
                    <div class="modal-tech-tags">
                        ${item.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                    ${item.linkedinPost ? `
                        <div class="linkedin-post-container">
                            <a href="${item.linkedinPost.url}" target="_blank" class="linkedin-post-link">
                                <i class="fab fa-linkedin"></i> ${item.linkedinPost.text}
                            </a>
                        </div>
                    ` : ''}
                </div>
            `;
        });
    }
    
    modalBody.innerHTML = content;
    
    // Show modal
    modal.style.display = 'block';
    // Allow scrolling within the modal
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, toggleDetails function available:', typeof window.toggleDetails);
    
    // Modal close functionality
    const modal = document.getElementById('experienceModal');
    const closeBtn = document.querySelector('.close');
    
    // Close modal when clicking the X button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});
