


export const priority = initializePriorities(); // make sure this happens first

function initializePriorities() {
    return ["High", "Medium", "Low"]; // example initialization
};

export let projects = [];
export function projectsSetter(usersProjects){
    projects = usersProjects;
}

export function project (title, description) {
    const project = {
        "title" : title,
        "description" : description,
        "tasks" : [],
    };
    projects.push(project);
};

export function task (project, title, description = 'title is enough of a descriptor for this simple task!', dueDate = 'no deadline', priority = 'high', notes = 'no additional notes') {//priority to fix
    const task = {
        "title" : title,
        "description" : description,
        "dueDate" : dueDate,
        "priority" : priority,
        "notes" : notes,
        "completed" : false,
    };
    project.tasks.push(task);
};