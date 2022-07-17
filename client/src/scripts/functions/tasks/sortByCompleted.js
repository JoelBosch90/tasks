
/**
 *  Function to sort the tasks by their completed status.
 * 
 *  @param  {Object}  taskA
 *    @property {Boolean}   done  Whether the task is done or not.
 *  @param  {Object}  taskB
 *    @property {Boolean}   done  Whether the task is done or not.
 *  @return {Number}
 */
export default function(taskA, taskB) {
  if (taskA.done && !taskB.done) return -1
  if (!taskA.done && taskB.done) return 1
  return 0
}
