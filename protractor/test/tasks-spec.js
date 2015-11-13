/* Test script for the Tasks List app */

//starts new test suite
describe('the tasks app', function(){ 

    //want to a get elements by ng-model
    var tasksTitleInp = element(by.model('newTask.title'));

    //grabs Add task button
    var addTaskBtn = element(by.buttonText('Add Task'));

    //grabs all li elements from ng-repeat to test length, captions, and etc
    var tasksList = element.all(by.repeater('task in tasks'))

    //the error message that shows when something is $dirty 
    var requiredMsg = $('.title-required-error');


    function addTask(title){
        tasksTitleInp.sendKeys(title);
        addTaskBtn.click()
    }

    function addMultipleTasks(num){
        var idx;
        for(idx = 0; idx < num; idx++){
            addTask('Task ' + idx);
        }
    }

    beforeEach(function (){
        browser.get('http://localhost:8000');
    });

    it('must have the proper page title', function(){
        expect(browser.getTitle()).toEqual('My Tasks');
    });

    it('must add a task', function(){
        var title = 'Learn Protractor';
        addTask(title);
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual(title);
    });

    it('must add a task hitting enter', function(){
        var title = 'Learn Protractor';
        tasksTitleInp.sendKeys(title);
        tasksTitleInp.sendKeys(protractor.Key.ENTER);

        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual(title);
    });

    it('must clear the title after adding', function(){
        addTask('box should be cleared');
        expect(tasksTitleInp.getAttribute('value')).toEqual('');
    });

    it('must add multiple tasks', function(){
        addMultipleTasks(10);
        expect(tasksList.count()).toEqual(10);
    });

    it('must show required validation error', function(){
        expect(requiredMsg.isPresent()).toEqual(false);
        tasksTitleInp.sendKeys('abc');
        tasksTitleInp.clear();
        expect(requiredMsg.isPresent()).toEqual(true);
        tasksTitleInp.sendKeys('abc');
        expect(requiredMsg.isPresent()).toEqual(false);        
    });

    it('must disable add task button with blank title', function(){
        expect(addTaskBtn.getAttribute('disabled')).toEqual('true');
        tasksTitleInp.sendKeys('abc');
        expect(addTaskBtn.getAttribute('disabled')).toEqual(null);        
    });

    it('must toggle down with click', function(){
        addTask('test style class');
        addTask('not marked as done');
        expect(tasksList.count()).toEqual(2);
        tasksList.get(0).click();
        expect(tasksList.get(0).getAttribute('class'))
            .toContain('completed-task');
        expect(tasksList.get(1).getAttribute('class'))
            .not.toContain('completed-task');
    });

    it('must purge completed-task', function(){
        addTask('Task 1');
        addTask('Task 2');
        expect(tasksList.count()).toEqual(2);
        tasksList.get(0).click();
        element(by.buttonText('Purge Completed Tasks')).click();
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual('Task 2');
    });
});











