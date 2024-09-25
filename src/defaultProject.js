import { task, priority, project, projects } from './constructors';
import {generateNewTaskForm} from './forms';


export function createDefaultProject() {
    project("Open my dream restaurant", "Step by step list of task to complete in order to open my company and make the best dishes in the world.");
    project("Open my dream swimming pool", "troppo bello nuotare in piscina. me ne devo creare una mia");

    task(projects[0], "Comprare il materiale", "E' necessario comprare i materiali per arredare la sala e le infrastrutture produttive dei locali cucina e magazzino", "02/03/2025", priority[0], "note non necessarie")//to remove
    task(projects[0], "Assumere personale", "Molto importante assumere camerieri, cuochi e hostess", "02/03/2075", priority[1], "Non devo dimenticare di fare accordi temporanei con i musicisti")//to remove
    task(projects[0], "Organizzare inaugurazione", "devo far vedere ai potenziali clienti quanto è bello il mio ristorante", "02/03/2029", priority[2], "nop")//to remove
    task(projects[0], "Creare pagine social", "La presenza online è essenziale.", "02/03/2029", priority[2], "Sentire il parere di un professionista esterno")//to remove
    task(projects[0], "Verificare fattibilità dell'angolo bar", "Dal punto di vista finanziario potrebbe non essere la cosa migliore istituire anche una zona bar separata dalla sala del ristorante. Il rapporto costi-ricavi va analizzato", "02/03/2029", priority[2], "")//to remove

    task(projects[1], "Acquisto spazi","", "02/03/2025", priority[0], "Me serve un bel capannone grosso ")//to remove
    task(projects[1], "Valutare apertura al pubblico", "voglio farla privata o ci faccio dei soldi vendendo gli ingressi?", "02/03/2075", priority[1], "")//to remove
    task(projects[1], "Assumere ragazze e ragazzi immagine", "Nella mia piscina voglio assolutamente persone attraenti che attraggano clienti", "02/03/2029", priority[0], "")//to remove
    
    };



export function addTaskButton(activeProject) {
    const addTaskButton = document.createElement('button');addTaskButton.textContent = 'Add a Task';    addTaskButton.classList= 'addTaskButton';
    const mainContent = document.querySelector('.mainContent');
    addTaskButton.addEventListener('click', () => {generateNewTaskForm(activeProject)});
    mainContent.appendChild(addTaskButton);
};

