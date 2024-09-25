//project specific configurations for the sample file
// const target = document.querySelector('.main');
// const menuItems = ['item1', 'item2', 'item3', 'item4'];
// generateDropDownMenu(target, menuItems);
//---------------------------------------------------

export function generateDropDownMenu(target, menuItems) {
    let formActive = false;
    target.style.display = 'flex';
    target.style.flexDirection = 'column';

    const dropDownButton = document.createElement('button');
    dropDownButton.textContent = 'Dropdown menu';
    dropDownButton.style.width = '200px';
    dropDownButton.style.height = '100px';

    target.appendChild(dropDownButton);

    dropDownButton.addEventListener('click', ()=> {
        if (formActive === false) {
            formActive = true;
            const mainMenuItemsDiv = document.createElement('div');
            mainMenuItemsDiv.style.display = 'flex';
            mainMenuItemsDiv.style.flexDirection = 'column';
            mainMenuItemsDiv.style.backgroundColor = 'rgba(190, 190, 216, 0.8)';
            target.appendChild(mainMenuItemsDiv);
            

            for (let i = 0; i < menuItems.length; i++) {
                const menuItem = document.createElement('div');
                menuItem.textContent = menuItems[i];
                menuItem.style.border = 'solid black 1px';
                mainMenuItemsDiv.appendChild(menuItem);
                menuItem.addEventListener('click', () => {
                    dropDownButton.textContent = menuItems[i];
                    mainMenuItemsDiv.remove();
                    formActive = false;
                })
            }
        }
    })
}

