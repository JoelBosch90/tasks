/**
 *  Function to update an existing task.
 *  @param  {Fuction} setTasks  The useState style setter function to get/set
 *                              the task.
 *  @param  {Number}  id        The id of the task to update.
 *  @param  {Object}  update    An object mapping the properties to update (any
 *                              properties that are not included will not be
 *                              changed)
 */
export default function (setTasks, id, update) {
  setTasks(tasks => {
    return tasks.map(task => {

      // Don't change unrelated tasks.
      if (task.id !== id) return task

      // Install the updated properties, but never update the identifier.
      return { ...task, ...update, id: task.id }
    })
  })
}
