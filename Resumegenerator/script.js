function updateResume() {
    document.getElementById('previewName').innerText = document.getElementById('name').value || "Your Name";
    document.getElementById('previewEmail').innerText = document.getElementById('email').value || "Your Email";
    document.getElementById('previewPhone').innerText = document.getElementById('phone').value || "Your Phone";
    document.getElementById('previewdob').innerText = document.getElementById('dob').value || "Your DOB";
    
    updateListPreview('education-container', 'previewEducation', 'Your Education');
    updateListPreview('skills-container', 'previewSkills', 'Your Skills');
    updateListPreview('experience-container', 'previewExperience', 'Your Experience');
    updateListPreview('projects-container', 'previewProjects', 'Your Projects');
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
    input.style.width = '70%';
    input.style.marginRight = '10px';
    input.oninput = updateResume;
    newInput.appendChild(input);
    container.appendChild(newInput);
}

function generatePDF() {
    const resumeContent = document.getElementById('resumePreview');
    console.log(resumeContent.innerHTML); // Debugging: Check if content is being captured

    // Generate the PDF
    html2pdf().from(resumeContent).save();
}

document.addEventListener('DOMContentLoaded', () => {
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
});
