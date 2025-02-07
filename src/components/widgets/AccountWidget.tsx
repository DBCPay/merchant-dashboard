import styled from "styled-components";
import { UserData } from "../../interfaces";

interface AccountWidgetProps extends UserData {}

const AccountWidget = ({ accountType, fullname }: AccountWidgetProps) => {
  return (
    <WidgetCont className="p-4 bg-[var(--white)] hover:-translate-y-1 cursor-pointer rounded-sm">
      <div>
        <div className="flex items-center gap-2">
          <h4 className="pt-1">{fullname}</h4>
          <p className="text-[10px] rounded-xl info info-bg w-max px-2">
            {accountType.replace(accountType[0], accountType[0].toUpperCase())}
          </p>
        </div>
      </div>
    </WidgetCont>
  );
};

const WidgetCont = styled.div`
  transition: 0.5s ease;
  box-shadow: 0px -2px 4px rgb(37 40 42 / 0.07);

  &:hover {
    box-shadow: 0px 2px 4px rgb(37 40 42 / 0.07);
  }
`;

export default AccountWidget;
