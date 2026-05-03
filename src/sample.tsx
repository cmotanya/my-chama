<div className="fu11 my-15 space-y-5 px-4">
  <h2 className="text-primary text-center text-4xl font-bold">
    What People Say
  </h2>
  <p className="text-muted-foreground text-center text-sm">
    Straight from the treasurers and chairpersons running their groups on
    My-Chama.
  </p>

  <div className="mt-6 space-y-3">
    {[
      {
        name: "Amina Wanjiru",
        role: "Treasurer, Nyumba Yetu Chama",
        location: "Nairobi",
        body: "Before My-Chama I spent every Sunday reconciling M-Pesa messages in a spreadsheet. Now it just happens. I haven't touched a formula in three months.",
      },
      {
        name: "James Omondi",
        role: "Chairman, Pwani Investment Circle",
        location: "Mombasa",
        body: "Members used to question the numbers at every meeting. Now I just open the app and show them. No more arguments, no more doubt.",
      },
      {
        name: "Grace Muthoni",
        role: "Secretary, Faida Women's Group",
        location: "Nakuru",
        body: "The loan reminders alone saved us. We used to chase people manually on WhatsApp. Now the system does it and repayments actually come in on time.",
      },
      {
        name: "Peter Kamau",
        role: "Treasurer, Umoja Table Banking",
        location: "Kisumu",
        body: "I was skeptical at first but setup took less than five minutes. Our group of 22 members was fully onboarded the same evening.",
      },
    ].map((t) => (
      <div key={t.name} className="feature-chip space-y-3 rounded-2xl p-4">
        <p className="text-muted-foreground text-xs leading-relaxed">
          "{t.body}"
        </p>
        <div className="flex items-center gap-3">
          <div
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
            style={{
              background: "var(--color-primary)",
              color: "var(--color-background)",
            }}
          >
            {t.name.charAt(0)}
          </div>
          <div>
            <p className="text-foreground text-xs font-semibold">{t.name}</p>
            <p className="text-muted-foreground text-[10px]">
              {t.role} · {t.location}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>;
