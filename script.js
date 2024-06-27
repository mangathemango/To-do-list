const todolist = document.getElementById("todolist")
const buttons = document.getElementById("buttons")
const buttons2 = document.getElementById("buttons2")
const wrapper = document.getElementById("wrapper")
const mode = document.getElementById("mode")
const form = document.getElementById("form")
let updating = false
let Tasks = JSON.parse(localStorage.getItem("Tasks"))


const insert = () => {
    const Newtask = document.getElementById("inputbox").value
    if(Newtask != "") {
        Tasks.push(Newtask)
    }
    updating = false
    update_list("insert",0)
    document.getElementById("inputbox").value = ""
}

const update_list = (mode,id) => {
    todolist.innerHTML = ''
    for (i = 0; i < Tasks.length; i++) {
        let Task = document.createElement("div")
        Task.id = i
        Task.className = "task"
        if (mode === "insert" && i === Tasks.length-1) {
            Task.style.animation = "fade-in 0.5s forwards"
        }
        if (mode === "remove" && i >= id) {
            Task.style.animation = "move-up 0.10s forwards"
        }
        todolist.appendChild(Task)
        
        let TaskName = document.createElement("p")
        TaskName.textContent = Tasks[i]
        TaskName.id = "Task" + i
        TaskName.className = "task_name"
        Task.appendChild(TaskName)

        let update_button = document.createElement("button")
        update_button.className = "edit_button"
        update_button.textContent = "🖊️"
        update_button.setAttribute("onclick",`update(${i})`)
        Task.appendChild(update_button)
        
        let delete_button = document.createElement("button")
        delete_button.className = "edit_button"
        delete_button.textContent = "❌"
        delete_button.setAttribute("onclick",`remove(${i})`)
        Task.appendChild(delete_button)
    }
    localStorage.setItem("Tasks", JSON.stringify(Tasks))
}

const remove = (i) => {
    Task = document.getElementById(i)
    Task.style.animation = "fade-out 0.10s forwards"
    setTimeout(function() {
        Task.innerHTML = ""
        Tasks.splice(i,1)
        update_list("remove",i)
    },100)
}

const update = (i) => {
    if (updating === false) {
        let Task = document.getElementById(i)

        let updateform = document.createElement("form")
        updateform.className = "updateform"
        updateform.action = "javascript: updatetask("+i+")"


        let updatetext = document.createElement("input")
        updatetext.id = "updatetext"
        updatetext.type = "text"
        updatetext.value = Tasks[i]
        updatetext.style.height = window.getComputedStyle(document.getElementById("Task" + i)).getPropertyValue("height")

        Task.append(updateform)
        updateform.append(updatetext)
        updating = true
    }
}

const updatetask = (i) => {
    Newtask = document.getElementById("updatetext").value
    Tasks[i] = Newtask
    updating = false
    update_list()
}

update_list()