import { task, priority, project, projects} from '../constructors';


export function consoleTest (){
    project("nuovo progetto", "qua bisogna lavorare ostia. dobbiamo completare tutte le tasks ASAP.");
    project("secondooooooooooo progetto", "prova secondo progettoprova secondo progettoprova secondo progetto");
    project("terzo progetto", "TERZOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");


    task(projects[1], "title", "a sample of task", "02/03/2025", priority[2], "must be done for yesterday. It's really important! super really important!!! But not really all that urgent.")//to remove
    task(projects[1], "title", "a sample of task", "02/03/2025", priority[2], "must be done for yesterday. It's really important! super really important!!! But not really all that urgent.")//to remove


    task(projects[2], "title", "a sample of task", "02/03/2025", priority[2], "must be done for yesterday. It's really important! super really important!!! But not really all that urgent.")//to remove


    task(projects[0], "title", "a sample of task", "02/03/2025", priority[0], "must be done for yesterday. It's really important! super really important!!! But not really all that urgent.")//to remove
    task(projects[0], "angoooora", "a difficult of task", "02/03/2075", priority[1], "must be done. It's really important! super really important!!! But not really all that urgent.")//to remove
    task(projects[0], "sisisisisisisisi", "an EXTREMELY DIFFICULT task", "02/03/2029", priority[2], "must be done for tomorrow. It's really important! super really important!!! But not really all that urgent.")//to remove


    console.table(projects);
    // console.table(projects[0].tasks);
    // console.table(projects[1].tasks);
    // console.table(projects[2].tasks);

};