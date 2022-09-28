const toggleNav = document.getElementById('toggle-nav')
const hamburger = document.getElementById('hamburger')
const closeButton = document.getElementById('close-button')
const nav = document.querySelector('.nav')
const header = document.querySelector('.header')
const navLink = document.querySelectorAll('.nav__link')

const modal = document.querySelector('.modal')
const work = document.querySelectorAll('.work')
const closeModal = document.getElementById('close-modal')
const form = document.querySelector('.right__contact')
const fullName = document.getElementById('fullName')
const email = document.getElementById('email')
const subject = document.getElementById('subject')
const message = document.getElementById('message')

const toast = document.querySelector('.toast')
let isFormValid = false

// send email
const sendEmail = () => {
    fetch("https://formsubmit.co/ajax/aeffaa5ba583c80b1abac3f7d768fa64", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: fullName.value,
            email: email.value,
            subject: subject.value,
            message: message.value,
        })
    });
}

// set Error message
const setError = (element, message) => {
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector('.error-msg')

    errorDisplay.innerText = message
    inputControl.classList.add('error')
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// validateinputs
const validateInputs = () => {
    const fullNameValue = fullName.value
    const emailValue = email.value
    const subjectValue = subject.value
    const messageValue = message.value
    isFormValid = true
    if(fullNameValue === '') {
        setError(fullName, 'Name is required')
        isFormValid = false
    }

    if(emailValue === '') {
        setError(email, 'Email is required')
        isFormValid = false
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        isFormValid = false
    }

    if (subjectValue === '') {
        setError(subject, 'Subject is required')
        isFormValid = false
    }

    if (messageValue === '') {
        setError(message, 'Message is required')
        isFormValid = false
    }
}

// clear input fields
const clearInputs = () => {
    fullName.value = ''
    email.value = ''
    subject.value = ''
    message.value = ''
}

// clear error messages
const clearError = () => {
    const errors = document.querySelectorAll('.error-msg')
    const inputErrors = document.querySelectorAll('.error')

    errors.forEach(error => {
        error.innerText = ''
    })

    inputErrors.forEach(inputError => {
        inputError.classList.remove('error')
    })
}

// form submit
form.addEventListener('submit', (e) => {
    e.preventDefault()
    validateInputs()
    // if form is valid send email pop up toast success message
    if (isFormValid){
        sendEmail()
        toast.classList.remove('toast-hidden')
        setTimeout(() => {
            toast.classList.add('toast-hidden')
        }, 1000)

        clearInputs()
        clearError()
    }
    
})


navLink.forEach(link => {
    link.addEventListener('click', () => {
        const current = document.querySelectorAll('.active')

        if (current.length > 0) {
            current[0].classList.remove('active')
        }

        link.classList.add('active')

        nav.setAttribute('data-visible', false)
        hamburger.classList.remove('d-none')
        closeButton.classList.add('d-none')
    })
});

toggleNav.addEventListener('click', () => {
    const visibility = nav.getAttribute('data-visible')
    if (visibility === 'false') {
        nav.setAttribute('data-visible', true)
        hamburger.classList.add('d-none')
        closeButton.classList.remove('d-none')
    } else {
        nav.setAttribute('data-visible', false)
        hamburger.classList.remove('d-none')
        closeButton.classList.add('d-none')
    }
})

// list of projects
const links = [
    {
        name: "Registrar's Office RMS",
        link: 'https://www.youtube.com/embed/ePvYdwmT4aI',
        description: 'A Record Management System for registrars office that tracks the requested documents and store it on the system. It also generate monthly and quarterly reports for the release documents from the office.',
        github: 'https://github.com/E-Jhay/registrar-rms',
        website: '',
        timestamps: [
            '0:01 Client side Request Document Form',
            '0:30 Admin side (login)',
            "0:49 Requested Document UI",
            '1:14 Generation of Reports UI',
            '1:43 Document Types UI',
            '2:01 Acounts UI',
            '2:30 Logs UI',
        ]
    },
]

// Add modal for every works that is click
work.forEach((workItem) => {
    workItem.addEventListener('click', () => {
        const workTitle = workItem.querySelector('.work__title').innerText
        
        const linkItem = links.find(((link) => link.name === workTitle))

        const iframe = document.createElement('iframe')
        iframe.setAttribute('width', '100%')
        iframe.setAttribute('height', '315px')
        iframe.setAttribute('title', 'YouTube video player')
        iframe.setAttribute('src', linkItem.link)
        iframe.setAttribute('frameborder', '0')
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture')
        iframe.setAttribute('allowfullscreen', '')
        iframe.setAttribute('loading', 'lazy')

        const h3 = document.createElement('h3')
        h3.classList.add('modal__title')
        h3.innerText = linkItem.name

        const p = document.createElement('p')
        p.classList.add('modal__description')
        p.innerText = linkItem.description

        const modalFooter = document.createElement('div')
        modalFooter.classList.add('modal-footer')

        const liveButton = document.createElement('a')
        liveButton.innerText = 'Live'
        liveButton.classList.add('modal-footer__item')
        liveButton.setAttribute('href', linkItem.website? linkItem.website : '#')
        if(linkItem.website === '') {
            liveButton.style.textDecoration = 'line-through'
            liveButton.style.pointerEvents = 'none'
        }
        liveButton.setAttribute('target', '_blank')

        const sourceCodeButton = document.createElement('a')
        sourceCodeButton.innerText = 'Github code'
        sourceCodeButton.classList.add('modal-footer__item')
        sourceCodeButton.setAttribute('href', linkItem.github? linkItem.github : '#')
        if(linkItem.github === '') {
            sourceCodeButton.style.textDecoration = 'line-through'
            sourceCodeButton.style.pointerEvents = 'none'
        }
        sourceCodeButton.setAttribute('target', '_blank')

        const ul = document.createElement('ul')
        ul.classList.add('timestamps')
        linkItem.timestamps.forEach(timestamp => {
            const li = document.createElement('li')
            li.innerText = timestamp

            ul.appendChild(li)
            console.log(timestamp)
        })

        modalFooter.appendChild(liveButton)
        modalFooter.appendChild(sourceCodeButton)

        modal.appendChild(iframe)
        modal.appendChild(h3)
        modal.appendChild(p)
        modal.appendChild(ul)
        modal.appendChild(modalFooter)

        modal.showModal()
    })
})
// remove the modal content after closing modal
function removeAllChildNodes(parent) {
    while (parent.children[1]) {
        parent.removeChild(parent.children[1]);
    }
}

// Close modal
closeModal.addEventListener('click', () => {
    removeAllChildNodes(modal)
    modal.close()
})

