import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from 'uuid';


interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity | null;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  submitting: boolean;
}

const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFotmState,
  createActivity,
  editActivity,
  submitting

}) => {

  const initializeForm = () => {
    if (initialFotmState) {
      return initialFotmState;
    }
    return {
      id: "",
      title: "",
      category: "",
      description: "",
      date: "",
      city: "",
      venue: ""
    }
  }

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  /*
  const handleImputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    //setActivity({ ...activity, [event.target.name]: event.target.value })
    setActivity({ ...activity, [name]: value })
  }
  */

  const handleImputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    //setActivity({ ...activity, [event.target.name]: event.target.value })
    setActivity({ ...activity, [name]: value })
  }

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid
      }
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleImputChange}
          name='title'
          placeholder='Title'
          value={activity.title}
        />
        <Form.TextArea
          rows={3}
          onChange={handleImputChange}
          name='description'
          placeholder='Description'
          value={activity.description}
        />
        <Form.Input
          onChange={handleImputChange}
          name='category'
          placeholder='Category'
          value={activity.category}
        />
        <Form.Input
          onChange={handleImputChange}
          name='date'
          type='datetime-local'
          placeholder='Date'
          value={activity.date}
        />
        <Form.Input
          onChange={handleImputChange}
          name='city'
          placeholder='City'
          value={activity.city}
        />
        <Form.Input
          onChange={handleImputChange}
          name='venue'
          placeholder='Venue'
          value={activity.venue}
        />
        <Button
          loading={submitting}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button onClick={() => setEditMode(false)} floated='right' type='button' content='Cancel' />
      </Form>
    </Segment >);
};


export default ActivityForm;
