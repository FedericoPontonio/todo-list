import { task, priority, project, projects, projectsSetter } from './constructors';
import { createDefaultProject, addTaskButton } from './defaultProject';
import { generateNewProjectForm, updateForm, updateProjectForm} from './forms';


//use user's projects if there exist any
(function () {
    let retrievedProjects = JSON.parse(localStorage.getItem('projectsJson'));
    if (retrievedProjects && retrievedProjects.length>0) {
        projectsSetter(retrievedProjects);
    }
    else {
        createDefaultProject();
    }
}) ();

export let activeProject = projects[0];

export function pageStructure () {

    //main sections
    let body = document.querySelector('.body');
    const leftMenu = document.createElement('div');leftMenu.classList = 'leftMenu';
    const mainContent = document.createElement('div');mainContent.classList = 'mainContent';
    body.appendChild(leftMenu);
    body.appendChild(mainContent);

    //left menu header
    renderLeftMenuHeader();
    //default projects
    renderProjectsButtons();

};

function renderProjectsButtons() {
    for (let i = projects.length-1; i >= 0; i--) {
        const projectBox = document.createElement('div'); projectBox.classList= 'projectBox';
        const manipulateProjectButtons = document.createElement('div');manipulateProjectButtons.classList='manipulateProjectButtons';
        const projectButton = document.createElement('button');projectButton.classList = 'projectButton';
        const updateProjectIcon = document.createElement('button');updateProjectIcon.textContent = 'Edit';updateProjectIcon.classList = 'updateDeleteButtons';updateProjectIcon.style.borderTopRightRadius = '20px';
            updateProjectIcon.addEventListener('click', ()=> {updateProjectForm(projects[i])});
        const deleteProjectIcon = document.createElement('button');deleteProjectIcon.textContent = 'Delete';deleteProjectIcon.classList='updateDeleteButtons';deleteProjectIcon.style.borderBottomRightRadius = '20px';
            deleteProjectIcon.addEventListener('click', ()=> {deleteproject(projects[i])});

        projectButton.textContent = projects[i].title;
        const leftMenu = document.querySelector('.leftMenu');
        projectBox.appendChild(projectButton);
        projectBox.appendChild(manipulateProjectButtons);
        manipulateProjectButtons.appendChild(updateProjectIcon);
        manipulateProjectButtons.appendChild(deleteProjectIcon);

        leftMenu.appendChild(projectBox);
        projectButton.addEventListener('click', ()=> {renderChildrenTasks(projects[i])})
        renderChildrenTasks(projects[i]);
    };
};

function renderLeftMenuHeader () {
    const projectHeader = document.createElement('header'); projectHeader.classList = 'projectHeader';
    const leftMenu = document.querySelector('.leftMenu');
    leftMenu.appendChild(projectHeader);

    const headerText = document.createElement('div'); headerText.classList = 'headerText'; headerText.textContent = 'Projects'; 
    projectHeader.appendChild(headerText); 
    const addProjectButton = document.createElement('button'); addProjectButton.classList = 'addProjectButton'; addProjectButton.textContent = 'Add a project';
    projectHeader.appendChild(addProjectButton); addProjectButton.addEventListener('click', generateNewProjectForm);
};

export function renderLeftMenu() {
    renderLeftMenuHeader ();
    renderProjectsButtons();
};

//called upon the form
export function renderChildrenTasks(projectConsidered) {
    const mainContent = document.querySelector('.mainContent');
    mainContent.innerHTML = '';
    (function createMainContentHeader() {   //sarebbe meglio separarlo da .maincontent e generarlo una sola volta
        const mainContentHeader = document.createElement('header'); mainContentHeader.classList = 'mainContentHeader';
            const mainContentHeaderText = document.createElement('p');mainContentHeaderText.textContent = 'Tasks';mainContentHeaderText.classList = 'mainContentHeader';
        const projectDescription = document.createElement('p'); projectDescription.textContent = projectConsidered.description;projectDescription.setAttribute('id', 'projectDescription');
        mainContentHeader.appendChild(projectDescription);
        mainContentHeader.appendChild(mainContentHeaderText);
        mainContent.appendChild(mainContentHeader);

        }) ();
    activeProject = projectConsidered;
    addTaskButton(projectConsidered);
    for (let i = 0; i < projectConsidered.tasks.length; i++) {
        const taskBox = document.createElement('div'); taskBox.classList = 'taskBox';

            let titleField = document.createElement('div');titleField.textContent = projectConsidered.tasks[i].title; titleField.classList = 'taskTitle';
            let descriptionField = document.createElement('div');descriptionField.textContent = projectConsidered.tasks[i].description;
            let dueDateField = document.createElement('div');dueDateField.textContent = projectConsidered.tasks[i].dueDate;
            let priorityField = document.createElement('div');priorityField.textContent = projectConsidered.tasks[i].priority;
            let notesField = document.createElement('div');notesField.textContent = projectConsidered.tasks[i].notes;
            let completedField = document.createElement('div');completedField.textContent = projectConsidered.tasks[i].completed;
            let deleteButton = document.createElement('button');deleteButton.textContent = 'Remove';deleteButton.classList = 'deleteButtons';
                deleteButton.addEventListener('click', () => {deleteTask(projectConsidered, i)});
            let updateButton = document.createElement('button');updateButton.textContent = 'Update';updateButton.classList = 'updateButtons';
                updateButton.addEventListener('click', () => {updateForm(projectConsidered, i, titleField, descriptionField, dueDateField, priorityField)});
            const manipulateTaskButtons = document.createElement('div');manipulateTaskButtons.classList = 'manipulateTaskButtons';manipulateTaskButtons.style.borderBottom = 'none';
                manipulateTaskButtons.appendChild(deleteButton);
                manipulateTaskButtons.appendChild(updateButton);

            taskBox.appendChild(titleField);
            taskBox.appendChild(descriptionField);
            taskBox.appendChild(dueDateField);
            taskBox.appendChild(priorityField);
            taskBox.appendChild(notesField);
            taskBox.appendChild(completedField);
            taskBox.appendChild(manipulateTaskButtons);


            mainContent.appendChild(taskBox); 
        };
    };
    
 //THIS IS NOT A RENDERING CODE.
    function deleteTask(projectConsidered, i) {            
        for (let j = 0; j < projectConsidered.tasks.length; j++) {
            if (projectConsidered.tasks[j].title == projectConsidered.tasks[i].title) {
                projectConsidered.tasks.splice(j,1);
                renderChildrenTasks(activeProject);
                updateLocalStorage();
                return
            };
        };
    };

    function deleteproject(projectConsidered) {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].title == projectConsidered.title) {
                projects.splice(i, 1);
                let leftMenu = document.querySelector('.leftMenu'); leftMenu.innerHTML = ''; 
                renderLeftMenu();
                //manage maincontent in case the last project is deleted
                if (projects.length > 0) {
                    renderChildrenTasks(projects[0]);
                }
                else {
                    const mainContent = document.querySelector('.mainContent');
                    mainContent.innerHTML = '';
                }
            }
            updateLocalStorage();
        }
    };

    function updateLocalStorage() {
        localStorage.setItem('projectsJson', JSON.stringify(projects));
    }



     //THIS IS NOT A RENDERING CODE.
