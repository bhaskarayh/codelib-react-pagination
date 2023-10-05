import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [query, setQuery] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getUsers();
    }, [page, keyword]);

    const getUsers = async () => {
        const response = await axios.get(
            `http://localhost:5000/users?search_query=${keyword}&page=${page}&limit=${limit}`
        );

        setUsers(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalPages);
        setRows(response.data.totalRows);
    };

    const changePage = ({ selected }) => {
        setPage(selected);
        if (selected === 9) {
            setMsg(
                'Jika tidak menemukan data yang Anda cari, silakan cari data dengan kata kunci spesifik!'
            );
        } else {
            setMsg('');
        }
    };

    const searchData = (e) => {
        e.preventDefault();
        setPage(0);
        setKeyword(query);
    };

    function _changeDateToString(dateString) {
        if (!dateString) {
            return '';
        }

        const date = new Date(dateString);
        const months = [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember'
        ];
        const formatted_date =
            date.getDate() +
            ' ' +
            months[date.getMonth()] +
            ' ' +
            date.getFullYear() +
            ' '; /* +
            new Date().getHours() +
            ':' +
            new Date().getMinutes(); */
        return formatted_date;
    }

    function _calcDate(startingDate) {
        let endingDate = new Date();

        let startDate = new Date(
            new Date(startingDate).toISOString().substr(0, 10)
        );
        if (!endingDate) {
            endingDate = new Date().toISOString().substr(0, 10); // need date in YYYY-MM-DD format
        }
        let endDate = new Date(endingDate);
        if (startDate > endDate) {
            const swap = startDate;
            startDate = endDate;
            endDate = swap;
        }
        const startYear = startDate.getFullYear();
        const february =
            (startYear % 4 === 0 && startYear % 100 !== 0) ||
            startYear % 400 === 0
                ? 29
                : 28;
        const daysInMonth = [
            31,
            february,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31
        ];

        let yearDiff = endDate.getFullYear() - startYear;
        let monthDiff = endDate.getMonth() - startDate.getMonth();
        if (monthDiff < 0) {
            yearDiff--;
            monthDiff += 12;
        }
        let dayDiff = endDate.getDate() - startDate.getDate();
        if (dayDiff < 0) {
            if (monthDiff > 0) {
                monthDiff--;
            } else {
                yearDiff--;
                monthDiff = 11;
            }
            dayDiff += daysInMonth[startDate.getMonth()];
        }

        return yearDiff + ' Year ' + monthDiff + ' Month ' + dayDiff + ' Day';
    }

    return (
        <div className="container mt-5">
            <div className="columns">
                <div className="column is-centered">
                    <form onSubmit={searchData}>
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input
                                    type="text"
                                    className="input"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Find something here..."
                                />
                            </div>
                            <div className="control">
                                <button
                                    type="submit"
                                    className="button is-info"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>
                    <table className="table is-striped is-bordered is-fullwidth mt-2">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Birthday</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id_user}</td>
                                    <td>{user.name}</td>
                                    <td>
                                        {_changeDateToString(user.birth_date)}
                                    </td>
                                    <td>{_calcDate(user.birth_date)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>
                        Total Rows: {rows} Page: {rows ? page + 1 : 0} of{' '}
                        {pages}
                    </p>
                    <p className="has-text-centered has-text-danger">{msg}</p>
                    <nav
                        className="pagination is-centered"
                        key={rows}
                        role="navigation"
                        aria-label="pagination"
                    >
                        <ReactPaginate
                            previousLabel={'< Pref'}
                            nextLabel={'Next >'}
                            pageCount={Math.min(10, pages)}
                            onPageChange={changePage}
                            containerClassName={'pagination-list'}
                            pageLinkClassName={'pagination-link '}
                            previousLinkClassName={'pagination-previous'}
                            nextLinkClassName={'pagination-next'}
                            activeLinkClassName={'pagination-link is-current'}
                            disabledLinkClassName={
                                'pagination-link is-disabled'
                            }
                            // breakLabel={'...'}
                            // breakClassName={'break-me'}
                            // previousLabel={'prev'}
                            // nextLabel={'next'}
                            // breakLabel={'...'}
                            // breakClassName={'break-me'}
                            // pageCount={pages}
                            // onPageChange={changePage}
                            // containerClassName={'pagination'}
                            // subContainerClassName={'pages pagination'}
                            // activeClassName={'active'}
                        />
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default UserList;
