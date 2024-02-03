"use client";

import { GlobalContext } from "@/components/GlobalContext/GlobalContext";
import { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";

import "./FormTask.css";

const FormTask = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "" as any,
  });

  const { formData, setFormData } = useContext(GlobalContext) as any; // Remove "as any" type assertion

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleEditorChange = (editor: any, data: any) => {
    // Update handleEditorChange parameters
    setFormData({ ...formData, description: data });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://tasks.vitasoftsolutions.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data.userdata);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-task">
      {" "}
      <div>
        <label htmlFor="name">Nom :</label>
        <input type="text" id="name" name="name" onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="profile-picture">Photo de profil :</label>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag and drop some files here, or click to select files</p>
        </div>
      </div>
      <div>
        <label htmlFor="birthdate">Date de naissance :</label>
        <DatePicker
          id="birthdate"
          name="birthdate"
          dateFormat="MM-dd-yyyy"
          selected={formData?.birthdate || new Date()}
          onChange={(date: Date) =>
            setFormData({ ...formData, birthdate: date })
          }
        />
      </div>
      <div>
        <label htmlFor="active-status">Statut actif :</label>
        <input
          type="checkbox"
          id="active-status"
          name="activeStatus"
          onChange={handleCheckboxChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description :</label>
        {/* <CKEditor onChange={handleEditorChange} /> */}
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormTask;
