function updateResume() {
    document.getElementById('previewName').innerText = document.getElementById('name').value || "Your Name";
    document.getElementById('previewEmail').innerText = document.getElementById('email').value || "Your Email";
    document.getElementById('previewPhone').innerText = document.getElementById('phone').value || "Your Phone";
    document.getElementById('previewdob').innerText = document.getElementById('dob').value || "Your DOB";
    
    updateListPreview('education-container', 'previewEducation', 'Your Education');
    updateListPreview('skills-container', 'previewSkills', 'Your Skills');
    updateListPreview('experience-container', 'previewExperience', 'Your Experience');
    updateListPreview('projects-container', 'previewProjects', 'Your Projects');
    updateListPreview('hobbies-container', 'previewHobbies', 'Your Hobbies');
    updateListPreview('reference-container', 'previewReference', 'Your Reference');
    updateListPreview('languages-container', 'previewLanguages', 'Your Languages');
}

function updateListPreview(containerId, previewId, defaultText) {
    const inputs = document.querySelectorAll(`#${containerId} input`);
    const list = document.getElementById(previewId);
    list.innerHTML = ''; 
    inputs.forEach(input => {
        if (input.value) {
            const listItem = document.createElement('li');
            listItem.innerText = input.value;
            list.appendChild(listItem);
        }
    });
    if (list.innerHTML === '') {
        const listItem = document.createElement('li');
        listItem.innerText = defaultText;
        list.appendChild(listItem);
    }
}

function addInputBox(containerId) {
    const container = document.getElementById(containerId);
    const newInput = document.createElement('div');
    newInput.classList.add(`${containerId}-input`);
    const input = document.createElement('input');
    input.type = 'text';
    input.style.width = '90%';
    input.style.marginRight = '10px';
    input.oninput = updateResume;
    newInput.appendChild(input);
    container.appendChild(newInput);
}

function generatePDF() {
    const resumeContent = document.getElementById('resumePreview');
    console.log(resumeContent.innerHTML);

    // Generate the PDF
    html2pdf().from(resumeContent).save();
}

function createResumePreview() {
    const resumePreview = document.createElement('div');
    resumePreview.className = 'resume-preview';
    resumePreview.id = 'resumePreview';
    resumePreview.innerHTML = `
        <h2 id="previewName">Your Name</h2>
        <div class="info">
            <p id="previewEmail">Your Email</p>
            <p id="previewPhone">Your Phone</p>
            <p id="previewdob">Your DOB</p>
        </div>
        <hr>
         <h3>Education</h3>
        <ul id="previewEducation">
            <li>Your Education</li>
        </ul>
        <hr>
         <h3>Languages</h3>
        <ul id="previewLanguages">
            <li>Your Languages</li>
        </ul>
        <hr>
         <h3>Hobbies</h3>
        <ul id="previewHobbies">
            <li>Your Hobbies</li>
        </ul>
        <hr>
        <h3>Skills</h3>
        <ul id="previewSkills">
            <li>Your Skills</li>
        </ul>
        <hr>
        <h3>Experience</h3>
        <ul id="previewExperience">
            <li>Your Experience</li>
        </ul>
        <hr>
       
        <h3>Projects</h3>
        <ul id="previewProjects">
            <li>Your Projects</li>
        </ul>
        <hr>
       
        <h3>Reference</h3>
        <ul id="previewReference">
            <li>Your Reference</li>
        </ul>`;
    document.body.appendChild(resumePreview);
}

document.addEventListener('DOMContentLoaded', () => {
    createResumePreview();

    const generateButton = document.getElementById('generateResumeBtn');
    generateButton.addEventListener('click', generatePDF);

    const addEducationBtn = document.getElementById('addEducationBtn');
    addEducationBtn.addEventListener('click', () => addInputBox('education-container'));

    const addSkillsBtn = document.getElementById('addSkillsBtn');
    addSkillsBtn.addEventListener('click', () => addInputBox('skills-container'));

    const addExperienceBtn = document.getElementById('addExperienceBtn');
    addExperienceBtn.addEventListener('click', () => addInputBox('experience-container'));

    const addProjectsBtn = document.getElementById('addProjectsBtn');
    addProjectsBtn.addEventListener('click', () => addInputBox('projects-container'));

    const addHobbiesBtn = document.getElementById('addHobbiesBtn');
    addHobbiesBtn.addEventListener('click', () => addInputBox('hobbies-container'));

    const addReferenceBtn = document.getElementById('addReferenceBtn');
    addReferenceBtn.addEventListener('click', () => addInputBox('reference-container'));

    const addLanguagesBtn = document.getElementById('addLanguagesBtn');
    addLanguagesBtn.addEventListener('click', () => addInputBox('languages-container'));
});