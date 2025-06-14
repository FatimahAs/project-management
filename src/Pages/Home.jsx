import React from "react";
import { Link } from "react-router";
const users = [
  {
    role: "Admin",
    email: "admin@admin.com",
    password: "12345",
  },
  {
    role: "Teacher 1",
    email: "teacher@teacher.com",
    password: "123456",
  },
  {
    role: "Teacher 2",
    email: "teacher@teacher.com",
    password: "12345",
  },
  {
    role: "Teacher 3",
    email: "teacher@teacher.com",
    password: "123",
  },
];
export default function Home() {
  return (
    <section className="min-h-screen  flex flex-col justify-center pt-8 lg:pt-32 bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
          <span className="inline-block">
            Manage
            <span className="relative whitespace-nowrap text-blue-600">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
              </svg>
              <span className="p-5 relative">Idea</span>
            </span>
          </span>
          <span className="inline-block">and</span>
          <span className="relative whitespace-nowrap text-blue-600">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
            </svg>
            <span className="p-5 relative">Team</span>
          </span>
        </h1>

        <p className="mx-auto mt-9 max-w-2xl text-lg tracking-tight text-slate-700 sm:mt-6">
          <span className="inline-block">Manage your Work and Team</span>
          <span className="inline-block m-1">
            Effectively and Professionally.
          </span>
        </p>
      </div>
      <div className="border border-indigo-600 mt-5 p-1 w-60 mx-auto rounded-full flex items-center justify-between mb-4">
        <span className="font-inter text-xs font-medium text-gray-900 ml-3">
          Explore And Sign in Now
        </span>
        <Link
          to="signin"
          className="w-8 h-8 rounded-full flex justify-center items-center bg-indigo-600"
        >
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.83398 8.00019L12.9081 8.00019M9.75991 11.778L13.0925 8.44541C13.3023 8.23553 13.4073 8.13059 13.4073 8.00019C13.4073 7.86979 13.3023 7.76485 13.0925 7.55497L9.75991 4.22241"
              stroke="white"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Link>
      </div>
      <div className="flex justify-center">
        <img
          src="dash.png"
          alt="Dashboard image"
          className="w-[100%] lg:w-[60%]"
        />
      </div>
      <div className="flex flex-col justify-center items-center mt-2">
        <div className="p-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <div className="bg-white shadow-md rounded-2xl p-6  hover:shadow-lg transition-all">
              <h4 className=" text-[13px] font-semibold text-blue-400 mb-2">
                {user.role}
              </h4>
              <p className="text-gray-700 text-[12px]">
                <span className="font-sm">Email:</span> {user.email}
              </p>
              <p className="text-gray-700 text-[12px]">
                <span className="font-sm">Password:</span> {user.password}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* <p>
        AdminEmail: admin@admin.com password: 12345 TeacherEmail1:
        teacher@teacher.com password: 123456 TeacherEmail2: teacher@teacher.com
        password: 12345 TeacherEmail3: teacher@teacher.com password: 123
      </p> */}
    </section>
  );
}
