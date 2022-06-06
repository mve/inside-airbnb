const TopTenHosts = ({ topTenHosts }) => {

  return (

    <div>
      <h4 className="text-lg font-bold">Top 10 hosts with most listings</h4>

      <table className="table-auto">
        <thead>
        <tr>
          <th className="border p-2">#</th>
          <th className="border p-2">Host name</th>
          <th className="border p-2">Listings</th>
        </tr>
        </thead>

        <tbody>

        {topTenHosts.map((host, index) => (
          <tr key={host.hostId}>
            <td className="border px-2"># {index + 1}</td>
            <td className="border px-2">{host.hostName}</td>
            <td className="border px-2">{host.count}</td>
          </tr>
        ))}

        </tbody>

      </table>

    </div>
  )
};

export default TopTenHosts;
