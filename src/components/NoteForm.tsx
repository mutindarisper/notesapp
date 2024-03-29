import  { FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CreatableReactSelect from "react-select/creatable"
import { NoteData, Tag } from '../App'
// import { useMemo } from "react"
import { v4 as uuidV4 } from "uuid"


type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
  } & Partial<NoteData>

const NoteForm = ({onSubmit,
     onAddTag,
     availableTags, 
     title="",
     markdown = "",
     tags = [],

} :NoteFormProps)  => {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setselectedTags] = useState<Tag[]>([])
    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags
        })
        navigate("..")
    }
  return (
    <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
            <Row>
                <Col>
                <Form.Group controlId='title'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control required ref={titleRef} defaultValue={title}/>    
                </Form.Group>
                </Col>
                
                <Col>
                <Form.Group controlId='tags'>
                    <Form.Label>Tags</Form.Label>
                    <CreatableReactSelect

                    onCreateOption={label => {
                        const newTag = { id: uuidV4(), label }
                        onAddTag(newTag)
                        setselectedTags(prev => [...prev, newTag])
                    }}
                    
                    value={selectedTags.map((tag) => {
                        return {label: tag.label, value: tag.id}
                    })} 

                    options={availableTags.map((tag) => {
                        return {label: tag.label, value: tag.id}
                    })}

                    onChange={tags => {
                        setselectedTags(tags.map((tag) => {
                            return {label: tag.label, id:tag.value}
                        }))
                    }}
                    
                    isMulti/>     
                </Form.Group>
                </Col>
            </Row>

            <Form.Group controlId='markdown'>
                    <Form.Label>Body</Form.Label>
                    <Form.Control  defaultValue={markdown} required as="textarea" ref={markdownRef} rows={15}/>    
                </Form.Group>

                <Stack direction='horizontal' gap={2} className='justify-content-end'>
                    <Button type='submit' variant='primary'>Save</Button>

                    <Link to="..">
                    <Button type='button' variant='outline-secondary'>Cancel</Button>

                    </Link>
                   
                </Stack>
        </Stack>
    </Form>
  )
}

export default NoteForm