document.addEventListener('DOMContentLoaded', () => {
    // Preloader Animation
    const preloader = document.querySelector('.preloader');
    const logoTexts = document.querySelectorAll('.logo-text');

    gsap.to(logoTexts[0], { duration: 1, x: '0%', ease: 'power3.out', delay: 0.5 });
    gsap.to(logoTexts[1], { duration: 1, x: '0%', ease: 'power3.out', delay: 0.5 });

    gsap.to(logoTexts, { duration: 0.5, opacity: 0, delay: 2, stagger: 0.2 });
    gsap.to(preloader, { duration: 1, y: '-100%', ease: 'power3.inOut', delay: 2.5 });

    // Enable scrolling after preloader animation
    setTimeout(() => {
        document.body.style.overflow = 'auto';
    }, 3500);

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    window.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Text Animations
    const splitText = new SplitType('[data-splitting]', { types: 'chars' });
    gsap.from(splitText.chars, {
        scrollTrigger: {
            trigger: '[data-splitting]',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
            once: true
        },
        duration: 0.5,
        y: 100,
        opacity: 0,
        stagger: 0.05,
        ease: 'power3.out'
    });

    // About Me Word-by-Word Animation
    const aboutMeText = new SplitType('[data-splitting-words]', { types: 'words' });
    gsap.from(aboutMeText.words, {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 60%',
            end: 'bottom 80%',
            toggleActions: 'play none none none',
            once: true
        },
        duration: 0.4,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out'
    });
    document.querySelectorAll('section').forEach(section => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleClass: 'visible',
                once: true
            }
        });
    });

    // Automatic Project Carousel
    const projectGallery = document.querySelector('.project-gallery');
    const projectGalleryWrapper = document.querySelector('.project-gallery-wrapper');
    const projectItems = document.querySelectorAll('.project-item');
    const totalWidth = (projectItems[0].offsetWidth + 40) * projectItems.length;
    projectGallery.style.width = totalWidth + 'px';

    // Clone project items for seamless loop
    projectItems.forEach(item => {
        const clone = item.cloneNode(true);
        projectGallery.appendChild(clone);
    });

    const carouselAnimation = gsap.to(projectGallery, {
        x: -totalWidth,
        duration: 40, // Adjust duration for speed
        ease: 'none',
        repeat: -1, // Infinite loop
    });

    projectGalleryWrapper.addEventListener('mouseenter', () => carouselAnimation.pause());
    projectGalleryWrapper.addEventListener('mouseleave', () => carouselAnimation.resume());


    // Three.js Background
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    const particles = new THREE.BufferGeometry();
    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.005
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 5;

    const animate = () => {
        requestAnimationFrame(animate);
        particleSystem.rotation.y += 0.0005;
        renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Close mobile nav on link click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navCollapse = document.querySelector('.navbar-collapse');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navCollapse);
                bsCollapse.hide();
            }
        });
    });
});
