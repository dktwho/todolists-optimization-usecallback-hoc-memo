import React, {memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";
import {TaskWithRedux} from "./TaskWithRedux";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.changeTodolistTitle, props.id])

    let tasks = props.tasks

    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id])

    // const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id), [props.id, props.removeTask])
    //
    // const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: boolean) => {
    //     props.changeTaskStatus(taskId, newIsDoneValue, props.id);
    // }, [props.id, props.changeTaskStatus])
    // const changeTaskTitle = useCallback((taskId: string, newValue: string) => {
    //     props.changeTaskTitle(taskId, newValue, props.id);
    // }, [props.id, props.changeTaskTitle])

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    // return <Task
                    //     key={t.id}
                    //     task={t}
                    //     removeTask={removeTask}
                    //     changeTaskStatus={changeTaskStatus}
                    //     changeTaskTitle={changeTaskTitle}/>

                    return <TaskWithRedux key={t.id} task={t} todoListId={props.id}/>
                })
            }
        </div>
        <div style={{paddingTop: "10px"}}>
            <ButtonWithMemo onClick={onAllClickHandler} color={'inherit'}
                            variant={props.filter === 'all' ? 'outlined' : 'text'} title={'All'}/>
            <ButtonWithMemo onClick={onActiveClickHandler} color={'primary'}
                            variant={props.filter === 'active' ? 'outlined' : 'text'} title={'Active'}/>
            <ButtonWithMemo onClick={onCompletedClickHandler} color={'secondary'}
                            variant={props.filter === 'completed' ? 'outlined' : 'text'} title={'Completed'}/>
        </div>
    </div>
})

export type ButtonPropsType = {
    title: string
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    variant: 'text' | 'outlined' | 'contained'
    onClick: () => void
}
const ButtonWithMemo = memo((props: ButtonPropsType) => {
    return (
        <Button variant={props.variant}
                onClick={props.onClick}
                color={props.color}
        >{props.title}
        </Button>
    )
})
