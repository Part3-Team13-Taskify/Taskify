const CreateTask = () => {
  return (
    <div className="flex flex-col max-w-500 w-full rounded-6 gap-32 px-32 py-28">
      <div className="title">할 일 생성</div>
      <form className="flex flex-col gap-32">
        <div className="flex flex-col gap-10">
          <label htmlFor="assignee">담당자</label>
          <select id="assignee" className="w-217">
            <option value="" className="text-gray">
              이름을 입력해 주세요
            </option>
            <option value="1">1번</option>
            <option value="2">2번</option>
            <option value="3">3번</option>
          </select>
        </div>
        <div className="flex flex-col gap-10">
          <label htmlFor="title">제목</label>
          <input id="title" className="" placeholder="제목을 입력해 주세요"></input>
        </div>
        <div className="flex flex-col gap-10">
          <label htmlFor="description">설명</label>
          <textarea id="description" className="resize-none" placeholder="설명을 입력해 주세요"></textarea>
        </div>
        <div className="flex flex-col gap-10">
          <label htmlFor="due-date">마감일</label>
          <input id="due-date" type="date" placeholder="날짜를 입력해 주세요"></input>
        </div>
        <div className="flex flex-col gap-10">
          <label htmlFor="tag">태그</label>
          <input id="tag" type="text" placeholder="입력 후 Enter"></input>
        </div>
        <div className="flex flex-col gap-10">
          <div>이미지</div>
          <button type="submit"></button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
