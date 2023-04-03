import { TextareaAutosize } from "@mui/material";
import AddAPhoto from "@mui/icons-material/AddAPhoto";

function PostTextBox(props) {
  let { post, setPost, onImageDialogOpen } = props;

  const handleInputChange = (event) => {
    setPost(event.target.value);
  };

  return (
    <div style={{ display: "grid", flexFlow: "nowrap" }}>
      <TextareaAutosize
        variant='outlined'
        style={{ width: "95%", height: 80 }}
        placeholder='Type Something...'
        value={post}
        onChange={handleInputChange}
      />
      <AddAPhoto
        sx={{
          display: {
            paddingTop: 5,
            paddingLeft: 5,
          },
        }}
        onClick={onImageDialogOpen}
      />
    </div>
  );
}

export { PostTextBox };
