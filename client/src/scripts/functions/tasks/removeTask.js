/**
 *  Function to remove an existing task.
 *  @param  {Fuction} setTasks  The useState style setter function to get/set
 *                              the task.
 *  @param  {Number}  id        The id of the task to remove.
 */
const updateTask = (setTasks, id) => {
  setTasks(tasks => {
    return tasks.filter(task => task.id !== id)
  })
}

export default updateTask
