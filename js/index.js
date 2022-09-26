const toggleNav = document.getElementById('toggle-nav')
const hamburger = document.getElementById('hamburger')
const closeButton = document.getElementById('close-button')
const nav = document.querySelector('.nav')
const header = document.querySelector('.header')
const navLink = document.querySelectorAll('.nav__link')

const modal = document.querySelector('.modal')
const work = document.querySelectorAll('.work')
const closeModal = document.getElementById('close-modal')

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
        console.log('open')
        nav.setAttribute('data-visible', true)
        hamburger.classList.add('d-none')
        closeButton.classList.remove('d-none')
    } else {
        console.log('close')
        nav.setAttribute('data-visible', false)
        hamburger.classList.remove('d-none')
        closeButton.classList.add('d-none')
    }
})

const links = [
    {
        name: "Registrar's Office RMS",
        link: 'https://www.youtube.com/embed/ePvYdwmT4aI',
        description: 'A Record Management System for registrars office that tracks the requested documents and store it on the system. It also generate monthly and quarterly reports for the release documents from the office.',
        github: 'https://github.com/E-Jhay/registrar-rms',
        website: ''
    },
    {
        name: 'Sample 2',
        link: 'https://www.youtube.com/embed/TAB_v6yBXIE',
        description: 'This is Sample 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem similique consequatur libero deleniti? Odio ab, sequi doloremque laborum facilis unde.',
        github: '',
        website: ''
    }
]

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

        modalFooter.appendChild(liveButton)
        modalFooter.appendChild(sourceCodeButton)

        modal.appendChild(iframe)
        modal.appendChild(h3)
        modal.appendChild(p)
        modal.appendChild(modalFooter)

        modal.showModal()
        console.log(workTitle)
    })
})
function removeAllChildNodes(parent) {
    while (parent.children[1]) {
        parent.removeChild(parent.children[1]);
    }
}

closeModal.addEventListener('click', () => {
    removeAllChildNodes(modal)
    modal.close()
})