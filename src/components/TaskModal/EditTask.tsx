import Image from 'next/image';
import TaskLabel from '../TaskLabel';
import Button from '../common/button';
import { ChangeEventHandler, useState } from 'react';
import Modal from '../common/modal';
import { faker } from '@faker-js/faker';
import { getRandomColor } from '@/faker';

interface EditTaskModalProps {
  openModal: boolean;
  handleModalClose: () => void;
}

type TaskData = {
  title: string;
  description: string;
  assignee: string[];
  dueDate: string;
  tag?: string[];
};

const EditTask: React.FC<EditTaskModalProps> = ({ openModal, handleModalClose }) => {
  if (!openModal) return null;

  function createRandomTaskData(): TaskData {
    return {
      title: faker.internet.userName(),
      description: faker.string.sample(),
      assignee: [faker.internet.userName(), faker.internet.userName(), faker.internet.userName()],
      dueDate: faker.date.future().toDateString(),
    };
  }

  const TASK_DATA = createRandomTaskData();

  const [titleValue, setTitleValue] = useState<string>(TASK_DATA.title);
  const [desrciptionValue, setDesrciptionValue] = useState<string>(TASK_DATA.description);
  const [status, setStatus] = useState<string>('')
  const [due, setDue] = useState<string>(TASK_DATA.dueDate)
  const [tag, setTag] = useState<string>('')
  const isRequiredFilled = desrciptionValue && titleValue;

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitleValue(e.target.value.trim());
  };
  const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setDesrciptionValue(e.target.value.trim());
  };
  const handleDateChange: ChangeEventHandler<HTMLInputElement> =(e) =>{
    setDue(e.target.value.trim());
  }
  const handleStatusChange: ChangeEventHandler<HTMLSelectElement> =(e)=>{
    setStatus(e.target.value);
  }
  const handleTagChange: ChangeEventHandler<HTMLInputElement> =(e)=>{
    setTag(e.target.value.trim())
  }

  return (
    <Modal
      className="max-w-540 w-full max-h-910 h-svh"
      openModal={openModal}
      handleModalClose={handleModalClose}
      upperChildren={
        <>
          <div className="text-24 font-bold">할 일 생성</div>
          <form className="flex flex-col gap-32 overflow-y-auto">
            <div className='flex flex-row mobile:flex-col gap-16 mobile:gap-24'>
            <TaskLabel htmlFor="status" label="상태">
              <select
                id="status"
                value={status}
                onSelect={handleStatusChange}
                className="max-w-217 w-full border-1 border-gray-9f rounded-6 focus:border-violet p-15 mobile:max-w-none"
              >
                <option value="to-do">To Do</option>
                <option value="done">Done</option>
                <option value="on-progress">On Progress</option>
              </select>
            </TaskLabel>
            <TaskLabel htmlFor="assignee" label="담당자">
              <select
                id="assignee"
                className="max-w-217 w-full border-1 border-gray-9f rounded-6 focus:border-violet p-15 mobile:max-w-none"
              >
                <option value="" className="text-gray">
                  이름을 입력해 주세요
                </option>
                <option value="1">{TASK_DATA.assignee[0]}</option>
                <option value="2">{TASK_DATA.assignee[1]}</option>
                <option value="3">{TASK_DATA.assignee[2]}</option>
              </select>
            </TaskLabel>
            
            </div>
            <TaskLabel htmlFor="title" label="제목" isRequired={true}>
              <input
                id="title"
                className="border-1 border-gray-9f rounded-6 focus:border-violet p-15"
                placeholder="제목을 입력해 주세요"
                value={titleValue}
                required
                onChange={handleTitleChange}
              ></input>
            </TaskLabel>
            <TaskLabel htmlFor="description" label="설명" isRequired={true}>
              <textarea
                id="description"
                className="resize-none border-1 border-gray-9f rounded-6 focus-within:border-violet p-15"
                placeholder="설명을 입력해 주세요"
                required
                value={desrciptionValue}
                onChange={handleDescriptionChange}
              ></textarea>
            </TaskLabel>
            <TaskLabel htmlFor="due-date" label="마감일">
              <input
                id="due-date"
                type="text"
                placeholder="날짜를 입력해 주세요"
                value={due}
                onChange={handleDateChange}
                className="border-1 border-gray-9f rounded-6 focus-within:border-violet p-15"
              ></input>
            </TaskLabel>
            <TaskLabel htmlFor="tag" label="태그">
              <input
                id="tag"
                type="text"
                placeholder="입력 후 Enter"
                onChange={handleTagChange}
                value={tag}
                className="border-1 border-gray-9f rounded-6 focus-within:border-violet p-15"
              ></input>
            </TaskLabel>
            <TaskLabel htmlFor="image" label="이미지">
              <button className="p-24 bg-gray-9f w-fit rounded-6">
                <Image src="assets/chip/addSmall.svg" width={28} height={28} alt="add image"></Image>
              </button>
            </TaskLabel>
          </form>
        </>
      }
      lowerChildren={
        <>
          <Button buttonType="modal2" bgColor="violet" textColor="white" disabled={!isRequiredFilled}>
            수정
          </Button>
          <Button buttonType="modal2" bgColor="white" textColor="gray" onClick={handleModalClose}>
            취소
          </Button>
        </>
      }
    ></Modal>
  );
};

export default EditTask;
