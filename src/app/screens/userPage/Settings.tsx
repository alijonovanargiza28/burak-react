import { Box } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import { useGlobal } from "../../hooks/useGlobals";
import { useState } from "react";
import { MemberUpdateInput } from "../../../lib/types/member";
import { T } from "../../../lib/types/common";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { Messages, serverApi } from "../../../lib/config";
import MemberService from "../../services/MemberService";

export function Settings() {
  const { authMember, setAuthMember } = useGlobal();
  console.log("authMember =", authMember);

  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage
      ? `${serverApi}/${authMember.memberImage}`
      : "/icons/default-user.svg",
  );

  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
    {
      memberNick: authMember?.memberNick,
      memberPhone: authMember?.memberPhone,
      memberPassword: authMember?.memberPassword,
      memberAdress: authMember?.memberAdress,
      memberDesc: authMember?.memberDesc,
      memberImage: authMember?.memberImage,
    },
  );

  // HANDLERS
  const memberNickHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberPhoneHandler = (e: T) => {
    memberUpdateInput.memberPhone = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberAdressHandler = (e: T) => {
    memberUpdateInput.memberAdress = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberDescriptionHandler = (e: T) => {
    memberUpdateInput.memberDesc = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const handleSubmitButton = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      if (
        memberUpdateInput.memberNick === "" ||
        memberUpdateInput.memberPhone === "" ||
        memberUpdateInput.memberAdress === "" ||
        memberUpdateInput.memberDesc === ""
      ) {
        throw new Error(Messages.error3);
      }

      const member = new MemberService();

      const result = await member.updateMember(memberUpdateInput);

      setAuthMember(result);

      await sweetTopSmallSuccessAlert("Modified successfully!", 700);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handleImageViewer = (e: T) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileType = file.type;

    const validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!validateImageTypes.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then();
    } else {
      memberUpdateInput.memberImage = file;
      setMemberUpdateInput({ ...memberUpdateInput });
      setMemberImage(URL.createObjectURL(file));
    }
  };

  return (
    <Box className={"settings"}>
      <Box className={"member-media-frame"}>
        <img src={memberImage} alt="Member" className={"mb-image"} />

        <div className={"media-change-box"}>
          <span>Upload image</span>
          <p>JPG, JPEG, PNG formats only!</p>

          <div className={"up-del-box"}>
            <Button component="label">
              <CloudDownloadIcon />

              <input type="file" hidden onChange={handleImageViewer} />
            </Button>
          </div>
        </div>
      </Box>

      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Username</label>

          <input
            className={"spec-input mb-nick"}
            type="text"
            placeholder={authMember?.memberNick}
            value={memberUpdateInput.memberNick}
            name="memberNick"
            onChange={memberNickHandler}
          />
        </div>
      </Box>

      <Box className={"input-frame"}>
        <div className={"short-input"}>
          <label className={"spec-label"}>Phone</label>

          <input
            className={"spec-input mb-phone"}
            type="text"
            placeholder={authMember?.memberPhone ?? "no phone"}
            value={memberUpdateInput.memberPhone}
            name="memberPhone"
            onChange={memberPhoneHandler}
          />
        </div>

        <div className={"short-input"}>
          <label className={"spec-label"}>Address</label>

          <input
            className={"spec-input mb-address"}
            type="text"
            placeholder={
              authMember?.memberAdress ? authMember.memberAdress : "no address"
            }
            value={memberUpdateInput.memberAdress}
            name="memberAddress"
            onChange={memberAdressHandler}
          />
        </div>
      </Box>

      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Description</label>

          <textarea
            className={"spec-textarea mb-description"}
            placeholder={
              authMember?.memberDesc ? authMember.memberDesc : "no description"
            }
            value={memberUpdateInput.memberDesc}
            name="memberDesc"
            onChange={memberDescriptionHandler}
          />
        </div>
      </Box>

      <Box className={"save-box"}>
        <Button variant="contained" onClick={handleSubmitButton}>
          Save
        </Button>
      </Box>
    </Box>
  );
}
