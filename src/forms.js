import { task, priority, project, projects } from './constructors';
import {activeProject, renderChildrenTasks,renderLeftMenu} from './rendering';



export function generateNewProjectForm () {

    const mainContent = document.querySelector('.mainContent');
    let form = document.createElement('form');
    form.setAttribute("method", "post");
    form.setAttribute('class', 'formProject');

    //title
    let titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'Title');
    titleInput.setAttribute('placeholder', 'prova');
    //description
    let descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('type', 'text');
    descriptionInput.setAttribute('name', 'Description');
    descriptionInput.setAttribute('placeholder', 'Brief description of the project');

    //submit
    let submitProjectForm = document.createElement('button');
    submitProjectForm.textContent = 'Submit';
    submitProjectForm.addEventListener('click', () => {
        project(titleInput.value, descriptionInput.value);
        const leftMenu = document.querySelector('.leftMenu');
        leftMenu.innerHTML = '';
        renderLeftMenu();
        event.preventDefault();
        updateLocalStorage();
        mainContent.removeChild(form);
    });

    form.appendChild(titleInput);
    form.appendChild(descriptionInput);
    form.appendChild(submitProjectForm);

    mainContent.appendChild(form);
};

export function updateProjectForm(projectConsidered) {
    const mainContent = document.querySelector('.mainContent');
    let form = document.createElement('form');
    form.setAttribute("method", "post");
    form.setAttribute('class', 'formProject');

    //title
    let titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'Title');
    titleInput.setAttribute('placeholder', 'Title of the project');
    titleInput.value = projectConsidered.title;
    //description
    let descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('type', 'text');
    descriptionInput.setAttribute('name', 'Description');
    descriptionInput.setAttribute('placeholder', 'Brief description of the project');
    descriptionInput.value = projectConsidered.description;

    //submit
    let submitProjectForm = document.createElement('button');
    submitProjectForm.textContent = 'Update project';
    submitProjectForm.addEventListener('click', () => {
        projectConsidered.title = titleInput.value;
        projectConsidered.description = descriptionInput.value;
        event.preventDefault();
        updateLocalStorage();
        mainContent.removeChild(form);
        let leftMenu = document.querySelector('.leftMenu');leftMenu.innerHTML = '';
        renderLeftMenu();
        renderChildrenTasks(projectConsidered);

    });

    form.appendChild(titleInput);
    form.appendChild(descriptionInput);
    form.appendChild(submitProjectForm);

    mainContent.appendChild(form);
};


export function generateNewTaskForm (activeProject) {
    const mainContent = document.querySelector('.mainContent');
    let form = document.createElement('form');
    form.setAttribute("method", "post");
    form.setAttribute('class', 'formTask');

    //title
    let titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'Title');
    titleInput.setAttribute('placeholder', 'Name of the task');

    //description
    let descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('type', 'text');
    descriptionInput.setAttribute('name', 'Description');
    descriptionInput.setAttribute('placeholder', 'What does this task involve?');

    //priority
    let priorityInput = document.createElement('select');priorityInput.setAttribute('name', 'priority');
        let lowPriority = document.createElement('option');
        lowPriority.textContent = 'Low';lowPriority.value = priority[2];
        priorityInput.appendChild(lowPriority);
        let mediumPriority = document.createElement('option');
        mediumPriority.textContent = 'Medium';mediumPriority.value = priority[1];
        priorityInput.appendChild(mediumPriority);
        let highPriority = document.createElement('option');
        highPriority.textContent = 'High';highPriority.value = priority[0];
        priorityInput.appendChild(highPriority);

    //dueDate
    let dueDateInput = document.createElement('input');
    dueDateInput.setAttribute('type', 'date');
    dueDateInput.setAttribute('name', 'Due date');
    dueDateInput.setAttribute('placeholder', 'Due date');


    //submit
    let submitTaskForm = document.createElement('button');
    submitTaskForm.textContent = 'Add taks';
    submitTaskForm.type = 'button';
    submitTaskForm.addEventListener('click', () => {
        task(activeProject, titleInput.value, descriptionInput.value,dueDateInput.value,priorityInput.value);
        console.log(priorityInput.value)
        event.preventDefault();
        updateLocalStorage();
        mainContent.removeChild(form);
        renderChildrenTasks(activeProject);//rendera sempre l'ultimo elemento dell'array projects
    });

    form.appendChild(titleInput);
    form.appendChild(descriptionInput);
    form.appendChild(priorityInput);
    form.appendChild(dueDateInput);
    form.appendChild(submitTaskForm);

    mainContent.appendChild(form);

};

//very similar to previous function but this updates
export function updateForm(projectConsidered, i, titleField, descriptionField, dueDateField, priorityField) {
    const mainContent = document.querySelector('.mainContent');
    let form = document.createElement('form');
    form.setAttribute("method", "post");
    form.setAttribute('class', 'formTask');

    //title
    let titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'Title');
    titleInput.setAttribute('placeholder', 'Name of the task');
    titleInput.value = titleField.textContent;

    //description
    let descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('type', 'text');
    descriptionInput.setAttribute('name', 'Description');
    descriptionInput.setAttribute('placeholder', 'What does this task involve?');
    descriptionInput.value = descriptionField.textContent;

    //priority
    let priorityInput = document.createElement('select');priorityInput.setAttribute('name', 'priority');
        let lowPriority = document.createElement('option');
        lowPriority.textContent = 'Low';lowPriority.value = priority[2];
        priorityInput.appendChild(lowPriority);
        let mediumPriority = document.createElement('option');
        mediumPriority.textContent = 'Medium';mediumPriority.value = priority[1];
        priorityInput.appendChild(mediumPriority);
        let highPriority = document.createElement('option');
        highPriority.textContent = 'High';highPriority.value = priority[0];
        priorityInput.appendChild(highPriority);
    priorityInput.value = priorityField.textContent;

    //dueDate
    let dueDateInput = document.createElement('input');
    dueDateInput.setAttribute('type', 'date');
    dueDateInput.setAttribute('name', 'Due date');
    dueDateInput.setAttribute('placeholder', 'Due date');
    dueDateInput.value = dueDateField.textContent;

    //submit
    let submitTaskForm = document.createElement('button');
    submitTaskForm.textContent = 'Update taks';
    submitTaskForm.type = 'button';
    submitTaskForm.addEventListener('click', () => {
        projectConsidered.tasks[i].title = titleInput.value;
        projectConsidered.tasks[i].description = descriptionInput.value;
        projectConsidered.tasks[i].priority = priorityInput.value;
        projectConsidered.tasks[i].dueDate = dueDateInput.value;
        event.preventDefault();
        updateLocalStorage();
        mainContent.removeChild(form);
        renderChildrenTasks(activeProject);//rendera sempre l'ultimo elemento dell'array projects
    });

    form.appendChild(titleInput);
    form.appendChild(descriptionInput);
    form.appendChild(priorityInput);
    form.appendChild(dueDateInput);
    form.appendChild(submitTaskForm);

    mainContent.appendChild(form);

    };

    //set up local storage
    function updateLocalStorage() {
        localStorage.setItem('projectsJson', JSON.stringify(projects));
    }

