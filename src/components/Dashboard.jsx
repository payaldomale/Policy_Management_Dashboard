// import { useEffect, useMemo, useState } from "react";
// import Layout from "./Layout";
// import Filters from "./Filters";
// import PolicyTable from "./PolicyTable";
// import Loader from "./Loader";
// import { policies as DATA } from "../data/policies";
// import { useDebounce } from "../hooks/useDebounce";

// const Dashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const [policies, setPolicies] = useState([]);

//   const [filters, setFilters] = useState({
//     search: "",
//     status: "",
//     from: "",
//     to: "",
//   });

//   const [sort, setSort] = useState({
//     key: "",
//     order: "asc",
//   });

//   const debouncedSearch = useDebounce(filters.search);

//   useEffect(() => {
//     setTimeout(() => {
//       setPolicies(DATA);
//       setLoading(false);
//     }, 800);
//   }, []);

//   const filteredPolicies = useMemo(() => {
//     let result = [...policies];

//     if (debouncedSearch) {
//       result = result.filter(
//         (p) =>
//           p.id.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
//           p.holder.toLowerCase().includes(debouncedSearch.toLowerCase())
//       );
//     }

//     if (filters.status) {
//       result = result.filter((p) => p.status === filters.status);
//     }

//     if (filters.from) {
//       result = result.filter((p) => p.startDate >= filters.from);
//     }

//     if (filters.to) {
//       result = result.filter((p) => p.startDate <= filters.to);
//     }

//     if (sort.key) {
//       result.sort((a, b) => {
//         const aVal = a[sort.key];
//         const bVal = b[sort.key];
//         if (sort.order === "asc") return aVal > bVal ? 1 : -1;
//         return aVal < bVal ? 1 : -1;
//       });
//     }

//     return result;
//   }, [policies, debouncedSearch, filters, sort]);

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleReset = () => {
//     setFilters({ search: "", status: "", from: "", to: "" });
//     setSort({ key: "", order: "asc" });
//   };

//   const handleSort = (key) => {
//     setSort((prev) => ({
//       key,
//       order: prev.key === key && prev.order === "asc" ? "desc" : "asc",
//     }));
//   };

//   return (
//     <Layout>
//       <h1 className="text-xl font-semibold mb-4">Policy Dashboard</h1>

//       <Filters
//         filters={filters}
//         onChange={handleFilterChange}
//         onReset={handleReset}
//       />

//       {loading ? (
//         <Loader />
//       ) : (
//         <PolicyTable
//           policies={filteredPolicies}
//           onSort={handleSort}
//           sort={sort}
//         />
//       )}
//     </Layout>
//   );
// };

// export default Dashboard;



import { useEffect, useMemo, useState } from "react";
import Layout from "./Layout";
import Filters from "./Filters";
import PolicyTable from "./PolicyTable";
import Loader from "./Loader";
import { policies as DATA } from "../data/policies";
import { useDebounce } from "../hooks/useDebounce";

const PAGE_SIZE = 10;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [policies, setPolicies] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    from: "",
    to: "",
  });

  const [sort, setSort] = useState({
    key: "",
    order: "asc",
  });

  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(filters.search);

  useEffect(() => {
    setTimeout(() => {
      setPolicies(DATA);
      setLoading(false);
    }, 800);
  }, []);

  const filteredPolicies = useMemo(() => {
    let result = [...policies];

    if (debouncedSearch) {
      result = result.filter(
        (p) =>
          p.id.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          p.holder.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (filters.status) {
      result = result.filter((p) => p.status === filters.status);
    }

    if (filters.from) {
      result = result.filter((p) => p.startDate >= filters.from);
    }

    if (filters.to) {
      result = result.filter((p) => p.startDate <= filters.to);
    }

    if (sort.key) {
      result.sort((a, b) => {
        const aVal = a[sort.key];
        const bVal = b[sort.key];
        if (sort.order === "asc") return aVal > bVal ? 1 : -1;
        return aVal < bVal ? 1 : -1;
      });
    }

    return result;
  }, [policies, debouncedSearch, filters, sort]);

  // PAGINATION
  const totalPages = Math.ceil(filteredPolicies.length / PAGE_SIZE);
  const pagedPolicies = filteredPolicies.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // reset page when filters change
  };

  const handleReset = () => {
    setFilters({ search: "", status: "", from: "", to: "" });
    setSort({ key: "", order: "asc" });
    setPage(1);
  };

  const handleSort = (key) => {
    setSort((prev) => ({
      key,
      order: prev.key === key && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const handlePage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setPage(pageNumber);
  };

  return (
    <Layout>
      <h1 className="text-xl font-semibold mb-4">Policy Dashboard</h1>

      <Filters
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleReset}
      />

      {loading ? (
        <Loader />
      ) : (
        <>
          <PolicyTable
            policies={pagedPolicies}
            onSort={handleSort}
            sort={sort}
          />

          {/* PAGINATION UI */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Showing {pagedPolicies.length} of {filteredPolicies.length}
            </div>

            <div className="flex gap-2">
              <button
                className="px-3 py-1 rounded border"
                onClick={() => handlePage(page - 1)}
                disabled={page === 1}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded border ${
                    page === i + 1 ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() => handlePage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="px-3 py-1 rounded border"
                onClick={() => handlePage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Dashboard;

