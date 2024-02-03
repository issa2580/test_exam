"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const ListTask = () => {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers: JSX.Element[] = users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map(
      (user: {
        id: number;
        name: string;
        profilePicture: string;
        birthdate: Date;
        joiningDate: Date;
        activeStatus: boolean;
      }) => (
        <div key={user.id}>
          <p>Nom : {user.name}</p>
          <Image src={user.profilePicture} alt={user.name} />
          <p>
            Date de naissance :{" "}
            {new Date(user.birthdate).toLocaleDateString("fr-FR")}
          </p>
          <p>
            Date d&apos;adhésion :{" "}
            {new Date(user.joiningDate).toLocaleDateString("fr-FR")}
          </p>
          <p>Statut actif : {user.activeStatus ? "Actif" : "Inactif"}</p>
        </div>
      )
    );

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("https://api.example.com/users");
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      {displayUsers}
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        previousLinkClassName={"previous"}
        nextLinkClassName={"next"}
        disabledClassName={"disabled"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default ListTask;
