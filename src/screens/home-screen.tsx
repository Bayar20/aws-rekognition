import { useContext, useState } from "react";
import { ScreenContainer } from ".";
import { Button, FileInput, Text } from "../components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearcgIcon } from "../assets/searchIcon.svg";
import { Loader } from "../components/loader";
import { AuthContext } from "../provider/authContext";
import { getUploadUrl, uploadFile, getMatchingFace } from "../api";

export const HomeScreen = () => {
  const { user }: any = useContext(AuthContext);
  const navigation = useNavigate();

  return user ? (
    <ScreenContainer justifyContent="justify-between" className="flex-col">
      <Header />
      <Content />
      <Footer />
    </ScreenContainer>
  ) : (
    <ScreenContainer>
      <Button
        className="pv-14 ph-30 mt-10 h-6-vh"
        onClick={() => navigation("/signIn")}
      >
        <Text fontSize="24">Sign in</Text>
      </Button>
    </ScreenContainer>
  );
};

const Content = () => {
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [searching, setSearching] = useState(false);
  const [imageResult, setImageResult] = useState("");

  const upload = async (file: any) => {
    setSearching(true);
    setSelectedFile(file);
    const url = await getUploadUrl("provideUrl", {
      name: `uploads/${file.name}`,
      type: file.type,
    });
    console.log(selectedFile);
    try {
      await uploadFile(url, file);
    } catch (e) {
      console.log(e);
    }
    const result = await getMatchingFace("findFace", {
      name: file.name,
    });

    if (result.FaceMatches.length > 0) {
      setImageResult(
        `https://bayaar-bucket.s3.us-east-2.amazonaws.com/faces/${result.FaceMatches[0].Face.ExternalImageId}`
      );
    } else {
      setImageResult("na")
    }
    setSearching(false);
  };

  const search = async (file: any) => {
    setSearching(true);
    setSearching(false);
  };

  return (
    <div className="w-60-vw flex justify-between align-center">
      <FileInput onFileSelect={upload} label="Click to upload" />

      {searching ? (
        <Loader />
      ) : (
        <div className="pointer" onClick={() => search(selectedFile)}>
          <SearcgIcon className="w-10-vw h-10-vw" />
          <Text fontSize="24">Search from AWS</Text>
        </div>
      )}

      <div className="image w-20-vw h-20-vw">
        {
          imageResult !== "na" ? (<img
          className={imageResult && "w-20-vw h-20-vw"}
          style={{ objectFit: "contain" }}
          src={imageResult}
          alt={imageResult}
        />) : (<div> Similar image not found</div>)
        }
        
      </div>
    </div>
  );
};

const Header = () => {
  const { user, logout }: any = useContext(AuthContext);

  return (
    <div className="flex h-6-vh align-center w-80-vw justify-between mt-10">
      <Text fontSize="32">{`user : ${user.username}`}</Text>
      <Button className="pv-14 ph-30" onClick={logout}>
        <Text fontSize="24">Log out</Text>
      </Button>
    </div>
  );
};

const Footer = () => {
  return (
    <Text fontSize="16" className="mb-20">
      Made by ❤️
    </Text>
  );
};
