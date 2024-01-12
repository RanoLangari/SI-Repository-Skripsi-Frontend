import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useState, useEffect } from "react";
import axios from "axios";

//nested data is ok, see accessorKeys in ColumnDef below
// const data = [
//   {
//     name: {
//       firstName: "John",
//       lastName: "Doe",
//     },
//     address: "261 Erdman Ford",
//     city: "East Daphne",
//     state: "Kentucky",
//   },
//   {
//     name: {
//       firstName: "Jane",
//       lastName: "Doe",
//     },
//     address: "769 Dominic Grove",
//     city: "Columbus",
//     state: "Ohio",
//   },
//   {
//     name: {
//       firstName: "Joe",
//       lastName: "Doe",
//     },
//     address: "566 Brakus Inlet",
//     city: "South Linda",
//     state: "West Virginia",
//   },
//   {
//     name: {
//       firstName: "Kevin",
//       lastName: "Vandy",
//     },
//     address: "722 Emie Stream",
//     city: "Lincoln",
//     state: "Nebraska",
//   },
//   {
//     name: {
//       firstName: "Joshua",
//       lastName: "Rolluffs",
//     },
//     address: "32188 Larkin Turnpike",
//     city: "Charleston",
//     state: "South Carolina",
//   },
// ];

const MahasiswaTable = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const [data, setData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${backendUrl}/api/admin/get-skripsi-process`, config)
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      });
  }, []);
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "nim", //access nested data with dot notation
        header: "NIM",
        size: 150,
      },
      {
        accessorKey: "nama",
        header: "Nama Mahasiswa",
        size: 150,
      },
      {
        accessorKey: "skripsi.judul_skripsi", //normal accessorKey
        header: "Judul Skripsi",
        size: 200,
      },
      {
        accessorKey: "jurusan",
        header: "Jurusan",
        size: 150,
      },
      {
        accessorKey: "skripsi.status",
        header: "status",
        size: 150,
      },
      {
        header: "Action",
        size: 150,
        Cell: ({ row }) => (
          <div>
            <button
              onClick={() => {
                window.location.href = `/admin/detail-skripsi/${row.original.id}`;
              }}
              className="btn btn-primary"
            >
              Detail
            </button>
          </div>

          // <div>
          //   <button
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MaterialReactTable table={table} />;
};

export default MahasiswaTable;
