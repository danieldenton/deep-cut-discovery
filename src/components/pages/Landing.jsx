import "../../css/Landing.css";

export default function Landing({ currentUser, setCurrentUser }) {
  return (
    <div className="landing">
      <div className="record">
        <div className="outer-record">
          <div className="inner-record">
            <h6>Deep Cut Discovery</h6>
          </div>
        </div>
      </div>
      <div className="explanation">
        <div className="ex-padd">
          <p className="dcdx">Deep Cut Discovery</p>
          <p className="x">
            is a music sharing and discussion blog where users get to share
            music they enjoy with other users. If you like what another user is
            into you can see all of the music they have shared to the site. It's
            a great way to find new music! You can use the Discogs API to search
            for the record you want to post. And if you have a link to the music
            you're sharing the you can share that as well.
          </p>
          <p>***Try clicking on the album covers on the home page feed.</p>
        </div>
      </div>
    </div>
  );
}
