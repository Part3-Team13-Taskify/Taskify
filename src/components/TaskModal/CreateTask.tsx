import Image from 'next/image';
import TaskLabel from './TaskLabel';
import Button from '../common/button';
import { ChangeEventHandler, useEffect, useState } from 'react';
import Modal from '../common/modal';
import { DateTimePicker } from '@mui/x-date-pickers';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import instance from '@/src/util/axios';

interface CreateTaskModalProps {
  openModal: boolean;
  handleModalClose: () => void;
  dashboardId: number;
  columnId: number;
}
interface CreateData {
  assigneeUserId?: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate?: string;
  tags?: string[] | [];
  imageUrl?: string;
}

type Member =
  | {
      nickname: string;
      profileImageUrl?: string;
      userId: number;
    }
  | undefined;

const CreateTask: React.FC<CreateTaskModalProps> = ({ openModal, handleModalClose, dashboardId, columnId }) => {
  if (!openModal) return null;

  const [isPending, setIsPending] = useState(true);
  const [memberData, setMemberData] = useState<Member[]>([]);
  const [createData, setCreateData] = useState<CreateData>({
    dashboardId: dashboardId,
    columnId: columnId,
    title: '',
    description: '',
    tags: [],
  });

  useEffect(() => {
    const getMemberData = async (dashboardId: number) => {
      try {
        const res = await instance.get(`members?dashboardId=${dashboardId}`);
        setMemberData(res.data.members);
      } catch {
        console.log('error');
      } finally {
        setIsPending(false);
      }
    };
    getMemberData(dashboardId);
  }, []);

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
  const handleTagChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const tags = e.target.value.trim();
    setCreateData((prev) => {
      return { ...prev, tags: tags.split(' ') };
    });
  };

  const handleCreateClick = async () => {
    const postTaskData = await instance.post(`cards`, createData);
    if (postTaskData.status === 201) {
      alert('생성 성공!');
      handleModalClose();
    }
  };

  return (
    <Modal className="max-w-540 w-full max-h-910 h-svh" openModal={openModal} handleModalClose={handleModalClose}>
      <div className="text-24 font-bold">할 일 생성</div>
      <form className="flex flex-col gap-32 overflow-y-auto">
        {/* TODO
        담당자 프로필 UI 구현 */}
        <TaskLabel htmlFor="assignee" label="담당자">
          <select
            id="assignee"
            className="max-w-217 w-full border-1 border-gray-9f rounded-6 focus:border-violet p-15"
            onChange={handleAssigneeSelect}
          >
            <option value={undefined} className="text-gray">
              이름을 입력해 주세요
            </option>
            {memberData.map((member) => {
              return <option value={member?.userId}>{member?.nickname}</option>;
            })}
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
          {/* TODO
          라이브러리 폰트 크기 및 디자인 조정 */}
          <DateTimePicker
            label="날짜를 입력해 주세요"
            className="w-full h-55"
            onChange={(date) => {
              setCreateData((prev) => {
                return { ...prev, dueDate: date ? date?.toDateString() : undefined };
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
        {/* TODO
        Enter로 태그 구분 기능 고려 */}
        <TaskLabel htmlFor="tag" label="태그">
          <input
            id="tag"
            type="text"
            placeholder="입력 후 Enter"
            className="border-1 border-gray-9f rounded-6 focus-within:border-violet p-15"
            onChange={handleTagChange}
          ></input>
        </TaskLabel>
        {/* TODO
        이미지 업로드 구현 */}
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
