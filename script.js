function updateResume() {
  document.getElementById("previewName").innerText =
    document.getElementById("name").value || "Your Name";
  document.getElementById("previewEmail").innerText =
    document.getElementById("email").value || "Your Email";
  document.getElementById("previewPhone").innerText =
    document.getElementById("phone").value || "Your Phone";

  const dobValue = document.getElementById("dob").value;
  if (dobValue) {
    const dobDate = new Date(dobValue);
    const formattedDob = `${String(dobDate.getDate()).padStart(2, '0')}-${String(dobDate.getMonth() + 1).padStart(2, '0')}-${dobDate.getFullYear()}`;
    document.getElementById("previewdob").innerText = formattedDob;
  } else {
    document.getElementById("previewdob").innerText = "Your DOB";
  }

  updateListPreview(
    "education-container",
    "previewEducation",
    "Your Education"
  );
  updateListPreview("skills-container", "previewSkills", "Your Skills");
  updateListPreview(
    "experience-container",
    "previewExperience",
    "Your Experience"
  );
  updateListPreview("projects-container", "previewProjects", "Your Projects");
  updateListPreview("hobbies-container", "previewHobbies", "Your Hobbies");
  updateListPreview(
    "reference-container",
    "previewReference",
    "Your Reference"
  );
  updateListPreview(
    "languages-container",
    "previewLanguages",
    "Your Languages"
  );

  // Ensure the resume preview is visible
  document.getElementById("resumePreview").style.display = "block";
}

function updateListPreview(containerId, previewId, defaultText) {
  const inputs = document.querySelectorAll(`#${containerId} input`);
  const list = document.getElementById(previewId);
  list.innerHTML = "";
  inputs.forEach((input) => {
    if (input.value) {
      const listItem = document.createElement("li");
      listItem.innerText = input.value;
      list.appendChild(listItem);
    }
  });
  if (list.innerHTML === "") {
    const listItem = document.createElement("li");
    listItem.innerText = defaultText;
    list.appendChild(listItem);
  }
}

function getInputValues(containerId) {
  const inputs = document.querySelectorAll(`#${containerId} input`);
  return Array.from(inputs)
    .map((input) => input.value)
    .filter((value) => value.trim() !== "");
}

function generateListItems(items) {
  return items.map((item) => ({
    text: `• ${item}`,
    margin: [20, 2, 0, 2],
  }));
}

function generateSection(title, items) {
  return [
    { text: title, style: 'sectionHeader' },
    ...generateListItems(items),
    { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1 }] },
    { text: '', margin: [0, 10, 0, 10] }
  ];
}

function generatePDF() {
  const name = document.getElementById('name').value || 'Your Name';
  const email = document.getElementById('email').value || 'Your Email';
  const phone = document.getElementById('phone').value || 'Your Phone';
  const dobValue = document.getElementById('dob').value;
  const dob = dobValue ? new Date(dobValue).toLocaleDateString("en-GB") : 'Your DOB';

  const sections = [
    ...generateSection('Education', getInputValues('education-container')),
    ...generateSection('Languages', getInputValues('languages-container')),
    ...generateSection('Skills', getInputValues('skills-container')),
    ...generateSection('Experience', getInputValues('experience-container')),
    ...generateSection('Projects', getInputValues('projects-container')),
    ...generateSection('Hobbies', getInputValues('hobbies-container'))
  ];

  const references = getInputValues('reference-container');
  if (references.length > 0) {
    sections.push(...generateSection('References', references));
  }

  const docDefinition = {
    content: [
      {
        text: name,
        style: 'header',
        alignment: 'center'
      },
      {
        text: `${email} | ${phone} | ${dob}`,
        style: 'subheader',
        alignment: 'center'
      },
      { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1 }] },
      { text: '', margin: [0, 10, 0, 10] },
      ...sections
    ],
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 12,
        color: '#666666',
        margin: [0, 0, 0, 10]
      },
      sectionHeader: {
        fontSize: 14,
        bold: true,
        color: '#2c3e50',
        margin: [0, 5, 0, 10]
      }
    },
    defaultStyle: {
      fontSize: 11,
      lineHeight: 1.2
    },
    pageMargins: [40, 40, 40, 40],
    pageSize: 'A4'
  };

  pdfMake.createPdf(docDefinition).download('resume.pdf');
}

function addInputBox(containerId) {
  const container = document.getElementById(containerId);
  const newInput = document.createElement("div");
  newInput.classList.add(`${containerId}-input`);
  const input = document.createElement("input");
  input.type = "text";
  input.style.width = "100%";
  input.style.marginRight = "10px";
  input.oninput = updateResume;
  newInput.appendChild(input);
  container.appendChild(newInput);
}

document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.getElementById("generateResumeBtn");
  generateButton.addEventListener("click", generatePDF);

  const addEducationBtn = document.getElementById("addEducationBtn");
  addEducationBtn.addEventListener("click", () =>
    addInputBox("education-container")
  );

  const addSkillsBtn = document.getElementById("addSkillsBtn");
  addSkillsBtn.addEventListener("click", () => addInputBox("skills-container"));

  const addExperienceBtn = document.getElementById("addExperienceBtn");
  addExperienceBtn.addEventListener("click", () =>
    addInputBox("experience-container")
  );

  const addProjectsBtn = document.getElementById("addProjectsBtn");
  addProjectsBtn.addEventListener("click", () =>
    addInputBox("projects-container")
  );

  const addHobbiesBtn = document.getElementById("addHobbiesBtn");
  addHobbiesBtn.addEventListener("click", () =>
    addInputBox("hobbies-container")
  );

  const addReferenceBtn = document.getElementById("addReferenceBtn");
  addReferenceBtn.addEventListener("click", () =>
    addInputBox("reference-container")
  );

  const addLanguagesBtn = document.getElementById("addLanguagesBtn");
  addLanguagesBtn.addEventListener("click", () =>
    addInputBox("languages-container")
  );
});