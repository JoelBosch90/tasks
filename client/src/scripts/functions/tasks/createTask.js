/**
 *  Function to create new tasks.
 *  @param  {Fuction} setTasks  The useState style setter function to get/set
 *                              the task.
 *  @param  {String}  title     The title for the new task.
 */
export default function (setTasks, title) {
  setTasks(tasks => {

    // Find the largest task id we currently have.
    const lastId = tasks.reduce((greatestId, task) => task.id > greatestId ? task.id : greatestId, 0)

    // Add a new task with the next id.
    return [ ...tasks, {
      title,
      id: lastId + 1,
      done: false,
    }]
  })
}
