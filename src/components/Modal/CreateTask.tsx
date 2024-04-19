import Image from 'next/image';
import TaskLabel from '../TaskLabel';
import Button from '../common/button';
import { ChangeEventHandler, useState } from 'react';

const CreateTask = () => {
  const [titleValue, setTitleValue] = useState<string>('');
  const [desrciptionValue, setDesrciptionValue] = useState<string>('');
  const isRequiredFilled = desrciptionValue && titleValue;

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitleValue(e.target.value.trim());
  };
  const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setDesrciptionValue(e.target.value.trim());
  };

  return (
    <div className="flex flex-col max-w-500 w-full rounded-6 gap-32 px-32 py-28">
      <div className="text-24 font-bold">할 일 생성</div>
      <form className="flex flex-col gap-32">
        <TaskLabel htmlFor="assignee" label="담당자">
          <select id="assignee" className="w-217 border-1 border-gray-9f rounded-6 focus:border-violet p-15">
            <option value="" className="text-gray">
              이름을 입력해 주세요
            </option>
            <option value="1">1번</option>
            <option value="2">2번</option>
            <option value="3">3번</option>
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
          <input
            id="due-date"
            type="date"
            placeholder="날짜를 입력해 주세요"
            className="border-1 border-gray-9f rounded-6 focus-within:border-violet p-15"
          ></input>
        </TaskLabel>
        <TaskLabel htmlFor="tag" label="태그">
          <input
            id="tag"
            type="text"
            placeholder="입력 후 Enter"
            className="border-1 border-gray-9f rounded-6 focus-within:border-violet p-15"
          ></input>
        </TaskLabel>
        <TaskLabel htmlFor="image" label="이미지">
          <button className="p-24 bg-gray-9f w-fit rounded-6">
            <Image src="assets/chip/addSmall.svg" width={28} height={28} alt="add image"></Image>
          </button>
        </TaskLabel>
        <div className="flex flex-row justify-end gap-12">
          <Button buttonType="modal2" bgColor="white">
            취소
          </Button>
          <Button buttonType="modal2" bgColor="violet" textColor="white" disabled={!isRequiredFilled}>
            생성
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
