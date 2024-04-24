import Image from 'next/image';
import TaskLabel from './TaskLabel';
import Button from '../common/button';
import { ChangeEventHandler, useState } from 'react';
import Modal from '../common/modal';
import { DateTimePicker } from '@mui/x-date-pickers';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface CreateTaskModalProps {
  openModal: boolean;
  handleModalClose: () => void;
  dashboardId: number;
  columnId: number;
}

const CreateTask: React.FC<CreateTaskModalProps> = ({ openModal, handleModalClose, dashboardId, columnId }) => {
  if (!openModal) return null;

  const [createData, setCreateData] = useState({
    assigneeUserId: 0,
    dashboardId: dashboardId,
    columnId: columnId,
    title: '',
    description: '',
    dueDate: '',
    tags: [],
    imageUrl: '',
  });

  const isRequiredFilled = createData.description && createData.title;

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCreateData((prev) => {
      return { ...prev, title: e.target.value.trim() };
    });
  };
  const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setCreateData((prev) => {
      return { ...prev, description: e.target.value.trim() };
    });
  };
  const handleAssigneeSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setCreateData((prev) => {
      return { ...prev, assigneeUserId: Number(e.target.value) };
    });
  };
  // const handleDateChange: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   const dateString = e.target.value;
  //   setCreateData((prev) => {
  //     return { ...prev, dueDate: e.target.value };
  //   });
  // };
  const handleTagChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const tags = e.target.value.trim();
    setCreateData((prev) => {
      return { ...prev, tag: tags.split(' ') };
    });
  };

  const handleCreateClick = () => {
    console.log(createData);
  };

  return (
    <Modal className="max-w-540 w-full max-h-910 h-svh" openModal={openModal} handleModalClose={handleModalClose}>
      <div className="text-24 font-bold">할 일 생성</div>
      <form className="flex flex-col gap-32 overflow-y-auto">
        <TaskLabel htmlFor="assignee" label="담당자">
          <select
            id="assignee"
            className="max-w-217 w-full border-1 border-gray-9f rounded-6 focus:border-violet p-15"
            onChange={handleAssigneeSelect}
          >
            <option value={undefined} className="text-gray">
              이름을 입력해 주세요
            </option>
            <option value={1}>1번</option>
            <option value={2}>2번</option>
            <option value={3}>3번</option>
          </select>
        </TaskLabel>
        <TaskLabel htmlFor="title" label="제목" isRequired={true}>
          <input
            id="title"
            className="border-1 border-gray-9f rounded-6 focus:border-violet p-15"
            placeholder="제목을 입력해 주세요"
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
            onChange={handleDescriptionChange}
          ></textarea>
        </TaskLabel>
        <TaskLabel htmlFor="due-date" label="마감일">
          {/* <ThemeProvider theme={theme}> */}
          <DateTimePicker
            label="날짜를 입력해 주세요"
            className="w-full h-55"
            onChange={(date) => {
              setCreateData((prev) => {
                return { ...prev, dueDate: date ? date?.toDateString() : '0' };
              });
            }}
          />
          {/* </ThemeProvider> */}
          {/* <input
            id="due-date"
            type="date"
            placeholder="날짜를 입력해 주세요"
            className="border-1 border-gray-9f rounded-6 focus-within:border-violet p-15"
            onChange={handleDateChange}
          ></input> */}
        </TaskLabel>
        <TaskLabel htmlFor="tag" label="태그">
          <input
            id="tag"
            type="text"
            placeholder="입력 후 Enter"
            className="border-1 border-gray-9f rounded-6 focus-within:border-violet p-15"
            onChange={handleTagChange}
          ></input>
        </TaskLabel>
        <TaskLabel htmlFor="image" label="이미지">
          <button className="p-24 bg-gray-9f w-fit rounded-6">
            <Image src="/assets/icon/addViolet.svg" width={28} height={28} alt="add image"></Image>
          </button>
        </TaskLabel>
      </form>
      <div className="flex flex-row-reverse gap-12">
        <Button
          buttonType="modal2"
          bgColor="violet"
          textColor="white"
          disabled={!isRequiredFilled}
          onClick={handleCreateClick}
        >
          생성
        </Button>
        <Button buttonType="modal2" bgColor="white" textColor="gray" onClick={handleModalClose}>
          취소
        </Button>
      </div>
    </Modal>
  );
};

export default CreateTask;
